import { Dispatch } from "redux";
import { isEnumValue, PlayerAction } from "../utils/enums";
import { doActions } from "../slices/playerSlice";
import { WebSocketActionTypes } from "pages/MainPage/middleware/utils/ActionTypes";


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

const onOpen = (dispatch: Dispatch) => () => {
  console.log("WebSocket Connected");
};

const onClose = (dispatch: Dispatch) => () => {
  console.log("WebSocket Disconnected");
};

const onMessage = (dispatch: Dispatch) => (event: MessageEvent) => {
  console.log("Message from server ", event.data);
  const moves = event.data.split(",");
  if (isEnumValue(moves[0], PlayerAction)) {
    dispatch(doActions(moves));
  }
};

export const webSocketMiddleware = (() => {
  let socket: WebSocket | null = null;

  return (store: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case WebSocketActionTypes.WEBSOCKET_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);
        socket.onopen = onOpen(store.dispatch);
        socket.onclose = onClose(store.dispatch);
        socket.onmessage = onMessage(store.dispatch);
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