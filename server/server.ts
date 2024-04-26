import dotenv from 'dotenv';
dotenv.config();

import express, {Express, Request, Response, NextFunction} from 'express'
import {createServer} from 'http'
import {PostgresDataSource} from './utils/data-source'
import routes from "./routes";
import {PORT} from "./config";
import {setupMiddleware} from "./middleware";

import WebSocket from "ws";
import swaggerUi from 'swagger-ui-express';
import {PythonShell, Options} from "python-shell";
import {writeFile} from "node:fs";

const app: Express = express()


PostgresDataSource.initialize().then(() => {



    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not set')
    }

    setupMiddleware(app)
    app.use('/api', routes)
    const server = createServer(app);

    server.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });



}).catch(error => {
    console.error('Error during Data Source initialization. \n 1.Does docker run?\n Error:', error);
});



const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message);
        let options = {
            mode: 'text',
            pythonOptions: ['-c'], // Execute code as a command line argument
        };

        writeFile('gameengine/player/main.py', message.toString(), (err) => {
            if (err) {
                console.error('Failed to write to main.py:', err);
                return;
            }
            console.log("Run code")
            let options: Options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: '../gameengine/player/',
                pythonPath: 'C:\\Users\\F-Gro\\AppData\\Local\\Programs\\Python\\Python312\\python.exe'
            };
            // Execute the modified script
            PythonShell.run("main.py", options).then((output) => {
                console.log(output);
                ws.send(output.toString());
            }).catch(err => {
                console.error('Failed to run Python script:', err);
            });
        });

    });

    ws.send('Hello from backend!');
});

export default app;
