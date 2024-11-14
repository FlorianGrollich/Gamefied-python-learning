import WebSocket, { WebSocketServer } from 'ws';
import { writeFile } from 'node:fs';
import { Options, PythonShell } from 'python-shell';
import WebSocketMessageDTO, {
  WebSocketActionMessageDTO, WebSocketCodeChangeMessageDTO,
  WebSocketCodeMessageDTO, WebSocketLoadGameMessageDTO,
} from '../types/DTO/WebSocketMessageDTO';
import WebSocketSessionModel from '../models/webSocketSessionModel';
import { ISession, Session } from '../models/sessionModel';

import { v4 as uuidv4 } from 'uuid';

class WebSocketController {
  private clients: Map<string, WebSocket>;
  private server: WebSocketServer;
  private redisClient;

  constructor(server: WebSocketServer, redisClient: any) {
    this.clients = new Map();
    this.server = server;
    this.redisClient = redisClient;
  }

  public handleConnection(ws: WebSocket) {
    const wsId = uuidv4();
    this.clients.set(wsId, ws);

    console.log('new websocket connection');
    ws.send('Hello from Backend!');

    ws.on('message', (message: string) => {
      this.handleMessage(wsId, message);
    });

    ws.on('close', () => {
      this.clients.delete(wsId);
       this.removeWebSocketIdFromRedis(wsId);
    });
  }


  private async removeWebSocketIdFromRedis(wsId: string) {
    const keys = await this.redisClient.keys('gameSession:*');
    for (const key of keys) {
      const session = await this.redisClient.hGetAll(key);
      if (session.userSocketIds) {
        const userSocketIds = JSON.parse(session.userSocketIds);
        const updatedUserSocketIds = userSocketIds.filter((id: string) => id !== wsId);
        await this.redisClient.hSet(key, { userSocketIds: JSON.stringify(updatedUserSocketIds) });
      }
    }
  }

  private handleMessage(wsId: string, message: string) {
    let parsedMessage: WebSocketMessageDTO;

    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error('Failed to parse message:', message);
      return;
    }
    switch (parsedMessage.type) {
      case 'code':
        this.handleCodeMessage(wsId, parsedMessage);
        break;
      case 'codeChange':
        this.handleCodeChangeMessage(wsId, parsedMessage);
        break;
      case 'loadGame':
        this.handleLoadGameMessage(wsId, parsedMessage);
        break;
      default:
        console.log('Unknown message type:', parsedMessage);
    }
  }

  private async handleLoadGameMessage(wsId: string, msg: WebSocketLoadGameMessageDTO) {
    const session = await this.redisClient.hGetAll(`gameSession:${msg.sessionId}`);
    if (Object.keys(session).length === 0) {
      const storedSession: ISession | null = await Session.findOne({ _id: msg.sessionId });
      if (storedSession === null) {
        this.clients.get(wsId)?.send(JSON.stringify({ type: 'error', message: 'Session not found' }));
        return;
      }

      await this.redisClient.hSet(`gameSession:${msg.sessionId}`, {
        userSocketIds: JSON.stringify([wsId]),
        code: storedSession.code,
        userEmails: JSON.stringify(storedSession.userEmails),
      }).then(() => {
        console.log('Session data successfully stored in Redis');
      }).catch((err: any) => {
        console.error('Failed to store session data in Redis:', err);
        this.clients.get(wsId)?.send(JSON.stringify({ type: 'error', message: 'Failed to store session data' }));
        return;
      });

      this.clients.get(wsId)?.send(JSON.stringify({ type: 'code', code: storedSession.code }));

    } else {
      const sessionObj: WebSocketSessionModel = WebSocketSessionModel.createFromRedis(session);

      this.redisClient.hSet(`gameSession:${msg.sessionId}`, {
        userSocketIds: JSON.stringify(sessionObj.checkIfWebSocketExists(wsId) ? sessionObj.userSocketIds : [...sessionObj.userSocketIds, wsId]),
        code: sessionObj.code,
        userEmails: JSON.stringify(sessionObj.userEmails),
      });

      this.clients.get(wsId)?.send(JSON.stringify({ type: 'code', code: sessionObj.code }));
    }
  }

  private async handleCodeChangeMessage(wsId: string, msg: WebSocketCodeChangeMessageDTO) {
    const session = await this.redisClient.hGetAll(`gameSession:${msg.sessionId}`);

    if (session === null) {
      console.error('Session not found');
      return;
    }
    const sessionObj: WebSocketSessionModel = WebSocketSessionModel.createFromRedis(session);

    this.redisClient.hSet(`gameSession:${msg.sessionId}`, {
      userSocketIds: JSON.stringify(sessionObj.userSocketIds),
      code: msg.code,
      userEmails: JSON.stringify(sessionObj.userEmails),
    });

    this.clients.forEach((client, id) => {
      if (id !== wsId && sessionObj.userSocketIds.includes(id)) {
        client.send(JSON.stringify({ type: 'codeChange', code: msg.code }));
      }
    });
  }

  private handleCodeMessage(wsId: string, msg: WebSocketCodeMessageDTO) {
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

        this.clients.get(wsId)?.send(JSON.stringify(outputDTO));
      }).catch(err => {
        console.error('Failed to run Python script:', err);
      });
    });
  }
}

export default WebSocketController;