import WebSocket, { WebSocketServer } from 'ws';
import * as http from 'node:http';
import WebsocketSendMessage from 'ddfrontend/src/pages/MainPage/middleware/utils/websocketSendMessage';


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
    let parsedMessage: WebsocketSendMessage;
  }
}
