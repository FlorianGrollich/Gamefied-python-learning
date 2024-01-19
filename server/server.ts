import cors from 'cors'
import express, {Express, Request, Response, NextFunction} from 'express'
import * as bodyParser from 'body-parser'
import {createServer} from 'http'
import {PostgresDataSource} from './utils/data-source'
import {rateLimit} from 'express-rate-limit'
import routes from "./routes";
import {PORT} from "./config";
import {setupMiddleware} from "./middleware";

import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerOptions';
import swaggerJSDoc from "swagger-jsdoc";

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set')
}
const app: Express = express()

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


setupMiddleware(app)
app.use('/api', routes)




PostgresDataSource.initialize().then(() => {
    const server = createServer(app);

    server.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}).catch(error => {
    console.error('Error during Data Source initialization:', error);
});

export default app;
