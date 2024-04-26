import {isEnumValue, PlayerAction,} from "../pages/MainPage/utils/enums";
import {doActions} from "../pages/MainPage/slices/playerSlice";

export const connectWebSocket = () => ({ type: "WEBSOCKET_CONNECT" });
export const disconnectWebSocket = () => ({ type: "WEBSOCKET_DISCONNECT" });
export const sendMessage = (message: string) => ({ type: "WEBSOCKET_SEND_MESSAGE", payload: message });
export const receiveMessage = (message: string) => ({ type: "WEBSOCKET_RECEIVE_MESSAGE", payload: message });


// middleware/webSocketMiddleware.ts

export const webSocketMiddleware = (function () {
    let socket: WebSocket | null = null;

    const onOpen = (dispatch: any) => () => {
        console.log('WebSocket Connected');
    };

    const onClose = (dispatch: any) => () => {
        console.log('WebSocket Disconnected');
    };

    const onMessage = (dispatch: any) => (event: MessageEvent) => {
        console.log('Message from server ', event.data);
        const moves = event.data.split(",");
        if (isEnumValue(moves[0], PlayerAction)) {
            dispatch(doActions(moves));
        }
    };

    return (store: any) => (next: any) => (action: any) => {
        switch (action.type) {
            case 'WEBSOCKET_CONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);
                socket.onopen = onOpen(store.dispatch);
                socket.onclose = onClose(store.dispatch);
                socket.onmessage = onMessage(store.dispatch);
                break;
            case 'WEBSOCKET_DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;
            case 'WEBSOCKET_SEND_MESSAGE':
                socket?.send(action.payload);
                break;
            default:
                return next(action);
        }
    };
})();
