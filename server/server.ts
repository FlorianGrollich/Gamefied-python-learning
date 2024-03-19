import express, {Express, Request, Response, NextFunction} from 'express'
import {createServer} from 'http'
import {PostgresDataSource} from './utils/data-source'
import routes from "./routes";
import {PORT} from "./config";
import {setupMiddleware} from "./middleware";
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';

const app: Express = express()


PostgresDataSource.initialize().then(() => {

    dotenv.config();

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not set')
    }
    const swaggerDocument = require('./swagger-output.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    setupMiddleware(app)
    app.use('/api', routes)
    const server = createServer(app);

    server.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}).catch(error => {
    console.error('Error during Data Source initialization. \n 1.Does docker run?\n Error:', error);
});

export default app;
