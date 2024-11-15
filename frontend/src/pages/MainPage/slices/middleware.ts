import CustomSocket from 'pages/MainPage/utils/socket';
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { WebSocketActionType, WebSocketEventType } from '../utils/enums';
import { handleSocketMessage } from '../utils/socketHandlers';
import WebSocketMessageDTO from 'model/DTO/WebSocketMessageDTO';

export const socketMiddleware = (socket: CustomSocket): Middleware<{}, any> =>
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {

        const state: RootState = getState();
        const { type, socketMsg } = action as { type: string, socketMsg: WebSocketMessageDTO };
        switch (type) {

          case WebSocketActionType.SOCKET_CONNECT:
            socket.connect(process.env.REACT_APP_WS_URL!);


            socket.on(WebSocketEventType.OPEN, () => {
              console.log('Websocket connection created');
            });
            socket.on(WebSocketEventType.MESSAGE, (data) => {
              handleSocketMessage(dispatch, data, state);

            });
            socket.on(WebSocketEventType.CLOSE, () => {
              console.log('Websocket connection closed');
            });
            break;
          case WebSocketActionType.SOCKET_DISCONNECT:
            socket.disconnect();
            break;
          case WebSocketActionType.SOCKET_SEND:
            console.log('Send msg: ', socketMsg);
            socket.send(socketMsg);
            break;

          default:
            next(action);
            console.log('Action: ', type);

        }


      };