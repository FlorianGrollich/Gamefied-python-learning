import { Dispatch } from "redux";
import { isEnumValue, PlayerAction } from "pages/MainPage/utils/enums";
import { doActions } from "pages/MainPage/slices/playerSlice";

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

interface websocketConnectProps {
  store: any;
  socket: WebSocket | null;
}

const websocketConnect = ({ store, socket }: websocketConnectProps) => {
  if (socket !== null) {
    socket.close();
  }
  socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);
  socket.onopen = onOpen(store.dispatch);
  socket.onclose = onClose(store.dispatch);
  socket.onmessage = onMessage(store.dispatch);

};

export default websocketConnect;