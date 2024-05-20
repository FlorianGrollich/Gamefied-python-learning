import { Dispatch } from "redux";
import { isEnumValue, PlayerAction } from "../utils/enums";
import { doActions } from "../slices/playerSlice";
import { WebSocketActionTypes } from "pages/MainPage/middleware/utils/ActionTypes";
import websocketConnect from "pages/MainPage/middleware/utils/websocketConnect";


export const connectWebSocket = () => ({ type: WebSocketActionTypes.WEBSOCKET_CONNECT });
export const disconnectWebSocket = () => ({ type: WebSocketActionTypes.WEBSOCKET_DISCONNECT });
export const sendMessage = (message: string) => ({
  type: WebSocketActionTypes.WEBSOCKET_SEND_MESSAGE,
  payload: message
});
export const receiveMessage = (message: string) => ({
  type: WebSocketActionTypes.WEBSOCKET_RECEIVE_MESSAGE,
  payload: message
});



export const webSocketMiddleware = (() => {
  let socket: WebSocket | null = null;

  return (store: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case WebSocketActionTypes.WEBSOCKET_CONNECT:
        websocketConnect({ store, socket });
        break;
      case WebSocketActionTypes.WEBSOCKET_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case WebSocketActionTypes.WEBSOCKET_SEND_MESSAGE:
        socket?.send(action.payload);
        break;
      default:
        return next(action);
    }
  };
})();