import express, { Express } from 'express';
import expressWs from 'express-ws';
import routes from '../routes';
import { setupMiddleware } from '../middleware';
import * as Sentry from '@sentry/node';

const app: Express = express();
expressWs(app);

setupMiddleware(app);

app.use('/api', routes);
Sentry.setupExpressErrorHandler(app);


export default app;
