import cors from 'cors';
import bodyParser from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import { Express } from 'express';



export function setupMiddleware(app: Express) {


    app.use(cors());
    app.use(bodyParser.json());
    app.use(rateLimiter());
}

function rateLimiter() {
    return rateLimit({
        windowMs: 60 * 1000, // 1 minute
        limit: 100,
        standardHeaders: true,
        legacyHeaders: false,
    });
}
