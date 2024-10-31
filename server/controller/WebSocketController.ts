import WebSocket, { WebSocketServer } from 'ws';
import * as http from 'node:http';
import { CodeMessage, WebSocketMessage } from '../types/WebSocketMessages';
import { writeFile } from 'node:fs';
import { Options, PythonShell } from 'python-shell';


class WebSocketController {
  private wss: WebSocketServer;

  constructor(server: http.Server) {
    this.wss = new WebSocketServer({server});

  }

  private initialize() {
    this.wss.on('connection', this.onConnection.bind(this))
  }

  private onConnection(ws: WebSocket) {
    console.log("new websocket connection");

    ws.on('message', (message: string) => {
      this.handleMessage(ws, message);
    });

    ws.on('close', () => {
      console.log("WEbsocket connection closed");
    });
  }

  private handleMessage(ws: WebSocket, msg: string) {
    let parsedMessage: WebSocketMessage;

    try {
      parsedMessage = JSON.parse(msg);
    } catch (err) {
      console.error("Failed to parse websocket message:", msg);
      return;
    }


    switch (parsedMessage.type) {
      case "code":
        this.handleCodeMessage(ws, parsedMessage as CodeMessage);
        break;
      default:
        console.error("Unknown Websocket msg type")
    }
  }

  private handleCodeMessage(ws: WebSocket, msg: CodeMessage) {
    let options = {
      mode: 'text',
      pythonOptions: ['-c'], // Execute code as a command line argument
    };

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
