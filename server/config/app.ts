import express, { Express } from 'express';
import expressWs from 'express-ws';
import routes from '../routes';
import { setupMiddleware } from '../middleware';

const app: Express = express();
expressWs(app);

setupMiddleware(app);

import webSocketRoutes from '../routes/webSocketRoutes';
app.use('/api', routes);
app.use('/api/ws', webSocketRoutes);

export default app;
