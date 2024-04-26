import cors from 'cors';
import bodyParser from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import { Express } from 'express';



export function setupMiddleware(app: Express) {
    const corsOptions = {
        origin: 'https://banana-frontend-jecx.vercel.app', // Adjust this to the domain from which you expect to get requests
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true, // If your front-end needs to send cookies or credentials
        optionsSuccessStatus: 200 // Some legacy browsers choke on 204
    };

    app.use(cors(corsOptions));
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
