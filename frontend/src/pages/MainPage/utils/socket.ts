import { WebSocketEventType } from './enums';
import WebSocketMessageDTO from 'model/DTO/WebSocketMessageDTO';

class CustomSocket {
  private socket: WebSocket | null;

  constructor() {
    this.socket = null;
  }

  connect(url: string) {
    if (this.socket === null) {
      try {
        this.socket = new WebSocket(url);
      } catch (err) {
        console.error('Error on connection socket: ', err);
      }
    } else {
      console.error('Socket already exists!');
    }
  }

  disconnect() {
    if (this.socket !== null) {
      try {
        this.socket.close();
      } catch (err) {
        console.error('Error on closing socket: ', err);
      }
    }
  }

  send(message: WebSocketMessageDTO) {
    if (this.socket !== null) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (err) {
        console.error('Error when sending websocket msg: ', err);
      }
    } else {
      console.error('Tried calling on send on socket which does not have a connection');
    }
  }

  on(eventType: WebSocketEventType, callback: (ev: Event | MessageEvent<any> | CloseEvent) => any) {
    if (this.socket !== null) {
      console.log('created socket event listner for: ', eventType, ' callback: ', callback);
      this.socket.addEventListener(eventType, callback);
    } else {
      console.error('Tried adding Event Listner to socket which has no connection');
    }
  }

}

export default CustomSocket;