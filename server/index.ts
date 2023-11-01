import express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes";
import {Request, Response} from "express";
import {createServer} from "http";
import {Server as WebSocketServer} from "ws";
import {PostgresDataSource} from "./utils/data-source";
import {User} from "./entity/User";

PostgresDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    const port = 3200;

    const server = createServer(app);

    const wss = new WebSocketServer({noServer: true});

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



    // insert new users for test
    await PostgresDataSource.manager.save(
        PostgresDataSource.manager.create(User, {
            username: "username",
            email: "email",
        })
    )

    console.log("Express server has started on port 3200. Open http://localhost:3200/users to see results")

}).catch(error => console.log(error))
