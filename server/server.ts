import dotenv from 'dotenv';
import { createServer } from 'http';
import { PORT } from './config';
import { setupMiddleware } from './middleware';
import { connectMongo } from './config/mongo';
import express, { Express, NextFunction, Request, Response } from 'express';
import routes from './routes';
import expressWs from 'express-ws';

dotenv.config();


const app: Express = express();

expressWs(app);

import webSocketRoutes from './routes/webSocketRoutes';
app.use('/api', routes);
app.use("/api/ws", webSocketRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error handler:');
  console.error(err.stack); // Logs error stack for debugging
  res.status(500).json({ message: 'Internal Server Error' });
});




if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set');
}

connectMongo().catch(err => {
  console.error(err);
});




setupMiddleware(app);


const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;