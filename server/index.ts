import express from 'express';
import {Server as WebSocketServer} from 'ws';
import {createServer} from 'http';
import {DataSource} from 'typeorm';

const port = 3200;

const app = express();

const server = createServer(app);

const wss = new WebSocketServer({noServer: true});


const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "mydatabase",
    synchronize: true,
    logging: false,
    entities: [
        "src/entity/**/*.ts"
    ],
});

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
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
