import { AppDispatch, RootState } from 'store';
import WebSocketMessageDTO from 'model/DTO/WebSocketMessageDTO';
import { doActions } from '../slices/playerSlice';


export const handleSocketMessage = (dispatch: AppDispatch, event: Event | MessageEvent<any> | CloseEvent, state: RootState) => {

  try {
    const data: WebSocketMessageDTO = JSON.parse((event as MessageEvent).data);

    switch (data.type) {
      case 'action':
        console.log('Actions received: ', data.actions);
        dispatch(doActions(data.actions));
        break;
      case 'code':
        console.log('Code change received: ', data.code);
        break;
      default:
        console.error('Unknown WebSocketMessageDTO type received: ', event);
    }
  } catch (error) {
    console.error('Error parsing WebSocket message:', error, 'Event data:', (event as MessageEvent).data);
  }
};