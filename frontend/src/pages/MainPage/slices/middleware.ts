import CustomSocket from 'pages/MainPage/utils/socket';
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { WebSocketActionType, WebSocketEventType } from '../utils/enums';

export const socketMiddleware = (socket: CustomSocket): Middleware<{}, any> =>
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {

        const { type } = action as { type: string };
        switch (type) {


          case WebSocketActionType.SOCKET_CONNECT:
            socket.connect("ws://localhost:8080/");


            socket.on(WebSocketEventType.OPEN, () => {
              console.log('Websocket connection created');
              socket.send(JSON.parse('{ "type": "test", "msg": "Hello from frontend"}'));
              console.log("")
            });
            socket.on(WebSocketEventType.MESSAGE, (data) => {
              console.log('Message from server:', data);
            });
            socket.on(WebSocketEventType.CLOSE, () => {
              console.log('Websocket connection closed');
            });
            break;
          case WebSocketActionType.SOCKET_DISCONNECT:
            socket.disconnect();
            break;
          default:
            console.error('Socket Middleware Error Type not found: ', type);
        }


      };