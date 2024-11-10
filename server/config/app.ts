import express, { Express } from 'express';
import expressWs from 'express-ws';
import routes from '../routes';
import { setupMiddleware } from '../middleware';

const app: Express = express();
expressWs(app);

setupMiddleware(app);

app.use('/api', routes);


export default app;
