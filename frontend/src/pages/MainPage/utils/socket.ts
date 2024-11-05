import { WebSocketEventType } from 'pages/MainPage/utils/WebSocketEventType';

class CustomSocket {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  disconnect() {
    try {
      this.socket.close();
    }
    catch (err) {
      console.error("Error on closing socket: ", err)
    }
  }

  send(message: JSON) {
    try {
      this.socket.send(JSON.stringify(message));
    } catch (err) {
      console.error("Error when sending websocket msg: ", err);
    }
  }

  on(eventType: WebSocketEventType, callback: (ev: Event | MessageEvent<any> | CloseEvent) => any ) {
    this.socket.addEventListener(eventType, callback);
  }

}

export default CustomSocket;