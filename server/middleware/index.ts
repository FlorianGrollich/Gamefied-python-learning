import cors from 'cors';
import bodyParser from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import { Express } from 'express';
import { rateLimiter } from './rateLimiter';



export function setupMiddleware(app: Express) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(rateLimiter());
}

