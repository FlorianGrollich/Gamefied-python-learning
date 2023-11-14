import * as dotenv from 'dotenv'
import cors from 'cors'
import express, { Express, Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './routes'
import { createServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import { PostgresDataSource } from './utils/data-source'
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config()

let corsOptions = {
  origin: 'http://localhost:3000',
};

const app: Express = express()
app.use(cors(corsOptions));
app.use(bodyParser.json())

// Content Security Policy (CSP) against Cross-Site Scripting (XSS)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https:/"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'self'"],
    reportUri: ["/csp-violation-report-endpoint"],
    upgradeInsecureRequests: []
  }
}));

 // HTTP Strict Transport Security (HSTS) for 2 years
app.use(helmet.hsts({ maxAge: 63072000 }));

 // X-Frame-Options against clickjacking
app.use(helmet.frameguard({ action: 'sameorigin' }));

// X-Content-Type-Options against MIME sniffing
app.use(helmet.noSniff());

// Server-side logging
app.use(morgan('combined'));

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set')
  process.exit(1)
}

function safeStringify(obj: any) {
  const cache = new Set()
  const stringified = JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return
      }
      cache.add(value)
    }
    return value
  })
  cache.clear()
  return stringified
}

PostgresDataSource.initialize()
  .then(async () => {
    Routes.forEach(route => {
      const method = route.method as keyof Express
      if (typeof app[method] === 'function') {
        app[method](
          route.route,
          (req: Request, res: Response, next: NextFunction) => {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next,
            )
            if (result instanceof Promise) {
              result
                .then(result => {
                  if (
                    result !== null &&
                    result !== undefined &&
                    !res.headersSent
                  ) {
                    res.send(safeStringify(result))
                  }
                })
                .catch(err => {
                  if (!res.headersSent) {
                    next(err)
                  }
                })
            } else if (
              result !== null &&
              result !== undefined &&
              !res.headersSent
            ) {
              res.send(safeStringify(result))
            }
          },
        )
      }
    })

    const server = createServer(app)
    const wss = new WebSocketServer({ noServer: true })

    wss.on('connection', ws => {
      console.log('Client connected')
      ws.on('message', message => {
        console.log(`Received: ${message}`)
      })
      ws.on('close', () => {
        console.log('Client disconnected')
      })
      ws.send('Welcome to the WebSocket server!')
    })

    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request)
      })
    })

    const port = process.env.PORT || 3200
    server.listen(port, () => {
      console.log(`Server listening on port: ${port}`)
    })
    console.log(
      `Express server has started on port 3200. Open http://localhost:${port}/users to see results`,
    )
  })
  .catch(error =>
    console.log('Error during Data Source initialization:', error),
  )

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  if (!res.headersSent) {
    if (
      (err as any).message.includes('Converting circular structure to JSON')
    ) {
      res
        .status(500)
        .send('Circular reference error: Cannot convert object to JSON')
    } else {
      res.status(500).send('Something broke!')
    }
  }
})

export default app
