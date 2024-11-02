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
import { verifyEnvVar } from './config/env';

app.use('/api', routes);
app.use('/api/ws', webSocketRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error handler:');
  console.error(err.stack); // Logs error stack for debugging
  res.status(500).json({ message: 'Internal Server Error' });
});


verifyEnvVar();
connectMongo();


setupMiddleware(app);


const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;