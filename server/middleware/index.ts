import bodyParser from 'body-parser';
import { Express } from 'express';
import { rateLimiter } from './rateLimiter';


export function setupMiddleware(app: Express) {
    app.use(bodyParser.json());
    app.use(rateLimiter());

}

