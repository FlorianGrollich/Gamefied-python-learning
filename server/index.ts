require('dotenv').config();

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import { createServer } from "http";
import { Server as WebSocketServer } from "ws";
import { PostgresDataSource } from "./utils/data-source";
import { User } from "./entity/User";

const app = express();
app.use(cors());
app.use(bodyParser.json());

PostgresDataSource.initialize().then(async () => {

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response<any>, next: NextFunction) => {
            const controllerInstance = new route.controller();
            const actionMethod = controllerInstance[route.action as keyof typeof controllerInstance] as (req: Request, res: Response, next: NextFunction) => Promise<any> | any;
            const result = actionMethod(req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });    

    const port = 3200;

    const server = createServer(app);

    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        ws.send('Welcome to the WebSocket server!');
    });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    server.listen(port, () => {
        console.log(`Server listening on port:${port}`);
    });

    console.log("Express server has started on port 3200. Open http://localhost:3200/users to see results");

}).catch(error => console.log(error));
