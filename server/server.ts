import dotenv from 'dotenv';

dotenv.config();

import express, { Express, Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
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



export default app;
