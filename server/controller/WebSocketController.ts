import WebSocket, { WebSocketServer } from 'ws';
import { CodeMessage, WebSocketMessage } from '../types/WebSocketMessages';
import { writeFile } from 'node:fs';
import { Options, PythonShell } from 'python-shell';


class WebSocketController {
  private clients: Set<WebSocket>;
  private server: WebSocketServer

  constructor(server: WebSocketServer) {
    this.clients = new Set();
    this.server = server
  }

  public handleConnection(ws: WebSocket) {
    console.log('New WebSocket connection');
    this.clients.add(ws);

    ws.send("Hello from Backend!")


    ws.on('message', (message: string) => {
      this.handleMessage(ws, message);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      this.clients.delete(ws);
    });
  }

  private handleMessage(ws: WebSocket, message: string) {
    let parsedMessage: WebSocketMessage;

    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error('Failed to parse message:', message);
      return;
    }
    switch (parsedMessage.type) {
      case "code":
        this.handleCodeMessage(ws, parsedMessage);
        break;
      default:
        console.log("Unknown message type:", parsedMessage);
    }
  }


  private handleCodeMessage(ws: WebSocket, msg: CodeMessage) {
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
        ws.send(output.toString());
      }).catch(err => {
        console.error('Failed to run Python script:', err);
      });
    });

  }
}

export default WebSocketController;
