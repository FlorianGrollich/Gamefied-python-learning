import WebSocket, { WebSocketServer } from 'ws';
import { writeFile } from 'node:fs';
import { Options, PythonShell } from 'python-shell';
import WebSocketMessageDTO, {
  WebSocketActionMessageDTO, WebSocketCodeChangeMessageDTO,
  WebSocketCodeMessageDTO, WebSocketLoadGameMessageDTO,
} from '../types/DTO/WebSocketMessageDTO';
import redisclient from '../config/redisclient';
import WebSocketSessionModel from '../models/webSocketSessionModel';
import { ISession, Session } from '../models/sessionModel';

class WebSocketController {
  private clients: Set<WebSocket>;
  private server: WebSocketServer;
  private redisClient;

  constructor(server: WebSocketServer, redisClient: any) {
    this.clients = new Set();
    this.server = server;
    this.redisClient = redisClient;
  }

  public handleConnection(ws: WebSocket) {
    this.clients.add(ws);

    console.log('new websocket connection');
    ws.send('Hello from Backend!');

    ws.on('message', (message: string) => {

      this.handleMessage(ws, message);
    });

    ws.on('close', () => {
      this.clients.delete(ws);
    });
  }

  private handleMessage(ws: WebSocket, message: string) {
    let parsedMessage: WebSocketMessageDTO;

    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error('Failed to parse message:', message);
      return;
    }
    switch (parsedMessage.type) {
      case 'code':
        this.handleCodeMessage(ws, parsedMessage);
        break;
      case 'codeChange':
        this.handleCodeChangeMessage(ws, parsedMessage);
        break;
      case 'loadGame':
        this.handleLoadGameMessage(ws, parsedMessage);
        break;
      default:
        console.log('Unknown message type:', parsedMessage);
    }
  }

  private async handleLoadGameMessage(ws: WebSocket, msg: WebSocketLoadGameMessageDTO) {
    const session = await redisclient.hGetAll(`gameSession:${msg.sessionId}`);
    if (Object.keys(session).length === 0) {
      const storedSession: ISession | null = await Session.findOne({ _id: msg.sessionId });
      if (storedSession === null) {
        ws.send(JSON.stringify({ type: 'error', message: 'Session not found' }));
        return;
      }

      await this.redisClient.hSet(`gameSession:${msg.sessionId}`, {
        userSockets: JSON.stringify([ws]),
        code: storedSession.code,
        userEmails: JSON.stringify(storedSession.userEmails),
      }).then(() => {
        console.log('Session data successfully stored in Redis');
      }).catch((err: any) => {
        console.error('Failed to store session data in Redis:', err);
        ws.send(JSON.stringify({ type: 'error', message: 'Failed to store session data' }));
        return;
      });


      ws.send(JSON.stringify({ type: 'code', code: storedSession.code }));

    } else {
      const sessionObj: WebSocketSessionModel = WebSocketSessionModel.createFromRedis(session);

      this.redisClient.hSet(`gameSession:${msg.sessionId}`, {
        userSockets: JSON.stringify([...sessionObj.userSockets, ws]),
        code: sessionObj.code,
        userEmails: JSON.stringify(sessionObj.userEmails),
      });

      ws.send(JSON.stringify({ type: 'code', code: sessionObj.code }));
    }


  }

  private async handleCodeChangeMessage(ws: WebSocket, msg: WebSocketCodeChangeMessageDTO) {
    const session = await redisclient.hGetAll(`gameSession:${msg.sessionId}`);

    console.log("code: ", session["code"]);
    console.log("userSockets: ", session["userSockets"]);

    if (session === null) {
      console.error('Session not found');
      return;
    }
    const sessionObj: WebSocketSessionModel = WebSocketSessionModel.createFromRedis(session);

    this.redisClient.hSet(`gameSession:${msg.sessionId}`, {
      userSockets: JSON.stringify(sessionObj.userSockets),
      code: msg.code,
      userEmails: JSON.stringify(sessionObj.userEmails),
    });

    this.clients.forEach((client) => {
      if (client !== ws) {
        console.log('sending code change to client');
        client.send(JSON.stringify({ type: 'codeChange', code: msg.code }));
      }
    });


  }

  private handleCodeMessage(ws: WebSocket, msg: WebSocketCodeMessageDTO) {
    console.log('handle Code: ', msg.code);

    writeFile('gameengine/player/main.py', msg.code, (err) => {
      if (err) {
        console.error('Failed to write to main.py:', err);
        return;
      }
      console.log('Run code');
      let options: Options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'gameengine/player/',
        pythonPath: 'python',
      };
      // Execute the modified script
      PythonShell.run('main.py', options).then((output) => {
        console.log(output);
        const outputDTO: WebSocketActionMessageDTO = { type: 'action', actions: output };

        ws.send(JSON.stringify(outputDTO));
      }).catch(err => {
        console.error('Failed to run Python script:', err);
      });
    });
  }
}

export default WebSocketController;