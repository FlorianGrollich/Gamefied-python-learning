import dotenv from 'dotenv';

dotenv.config();

import express, { Express, Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { PostgresDataSource } from './utils/data-source';
import routes from './routes';
import { PORT } from './config';
import { setupMiddleware } from './middleware';

import WebSocket from 'ws';
import swaggerUi from 'swagger-ui-express';
import { PythonShell, Options } from 'python-shell';
import { writeFile } from 'node:fs';
import * as mongoose from 'mongoose';
import { connectMongo } from './config/mongo';

const app: Express = express();


if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set');
}

connectMongo().catch(err => {console.error(err)});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error handler:");
  console.error(err.stack); // Logs error stack for debugging
  res.status(500).json({ message: "Internal Server Error" });
});

setupMiddleware(app);
app.use('/api', routes);
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message);
    let options = {
      mode: 'text',
      pythonOptions: ['-c'], // Execute code as a command line argument
    };

    writeFile('gameengine/player/main.py', message.toString(), (err) => {
      if (err) {
        console.error('Failed to write to main.py:', err);
        return;
      }
      console.log('Run code');
      let options: Options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'gameengine/player/',
        pythonPath: 'python',
      };
      // Execute the modified script
      PythonShell.run('main.py', options).then((output) => {
        console.log(output);
        ws.send(output.toString());
      }).catch(err => {
        console.error('Failed to run Python script:', err);
      });
    });

  });

  ws.send('Hello from backend!');
});

export default app;
