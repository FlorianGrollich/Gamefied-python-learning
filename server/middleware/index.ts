import bodyParser from 'body-parser';
import { Express } from 'express';
import { rateLimiter } from './rateLimiter';
import cors from 'cors';

export function setupMiddleware(app: Express) {
  app.use(cors({ origin: 'https://banana-frontend-jecx-jpzia7buw-flos-projects-7df6fe2d.vercel.app' }));
  app.use(bodyParser.json());
  app.use(rateLimiter());

}

