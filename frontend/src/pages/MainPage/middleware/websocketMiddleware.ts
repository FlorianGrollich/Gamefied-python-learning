import { Dispatch } from 'redux';
import { isEnumValue, PlayerAction } from "../utils/enums";
import { doActions } from "../slices/playerSlice";

export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const WEBSOCKET_DISCONNECT = "WEBSOCKET_DISCONNECT";
export const WEBSOCKET_SEND_MESSAGE = "WEBSOCKET_SEND_MESSAGE";
export const WEBSOCKET_RECEIVE_MESSAGE = "WEBSOCKET_RECEIVE_MESSAGE";
const onOpen = (dispatch: Dispatch) => () => {
    console.log('WebSocket Connected');
};

const onClose = (dispatch: Dispatch) => () => {
    console.log('WebSocket Disconnected');
};

const onMessage = (dispatch: Dispatch) => (event: MessageEvent) => {
    console.log('Message from server ', event.data);
    const moves = event.data.split(",");
    if (isEnumValue(moves[0], PlayerAction)) {
        dispatch(doActions(moves));
    }
};

export const webSocketMiddleware = (() => {
    let socket: WebSocket | null = null;

    return (store: any) => (next: any) => (action: any) => {
        switch (action.type) {
            case WEBSOCKET_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);
                socket.onopen = onOpen(store.dispatch);
                socket.onclose = onClose(store.dispatch);
                socket.onmessage = onMessage(store.dispatch);
                break;
            case WEBSOCKET_DISCONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;
            case WEBSOCKET_SEND_MESSAGE:
                socket?.send(action.payload);
                break;
            default:
                return next(action);
        }
    };
})();