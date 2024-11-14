import dotenv from 'dotenv';
import { createServer } from 'http';
import { PORT } from './config';
import { setupMiddleware } from './middleware';
import { connectMongo } from './config/mongo';
import { verifyEnvVar } from './config/env';
import app from './config/app';
import { WebSocketServer } from 'ws';
import WebSocketController from './controller/WebSocketController';
import redisclient from './config/redisclient';

dotenv.config();

verifyEnvVar();
connectMongo();


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});
setupMiddleware(app);


const wss = new WebSocketServer({ port: 8080 });
const wsscon = new WebSocketController(wss, redisclient);

wss.on('connection', function connection(ws) {
  wsscon.handleConnection(ws);
});
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});



