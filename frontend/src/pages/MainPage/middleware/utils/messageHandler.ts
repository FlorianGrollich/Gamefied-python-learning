// messageHandler.ts
import { Dispatch } from "redux";
import { isEnumValue, PlayerAction } from "../../utils/enums";
import { doActions } from "../../slices/playerSlice";

export const onMessage = (dispatch: Dispatch) => (event: MessageEvent) => {
  console.log("Message from server ", event.data);
  const moves = event.data.split(",");
  if (isEnumValue(moves[0], PlayerAction)) {
    dispatch(doActions(moves));
  }
};