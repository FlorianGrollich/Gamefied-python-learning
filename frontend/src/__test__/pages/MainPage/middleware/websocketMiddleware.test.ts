import {
  webSocketMiddleware,
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
} from '../../../../pages/MainPage/middleware/websocketMiddleware';
import websocketConnect from '../../../../pages/MainPage/middleware/utils/websocketConnect';
import websocketDisconnect from '../../../../pages/MainPage/middleware/utils/websocketDisconnect';
import websocketSendMessage from '../../../../pages/MainPage/middleware/utils/websocketSendMessage';

jest.mock('../../../../pages/MainPage/middleware/utils/websocketConnect');
jest.mock('../../../../pages/MainPage/middleware/utils/websocketDisconnect');
jest.mock('../../../../pages/MainPage/middleware/utils/websocketSendMessage');

interface Action {
  type: string;
  payload: string;
}

interface Store {
  dispatch: Function;
}

type Next = Function;

describe('websocketMiddleware', () => {
  let store: Store, next: Next, action: Action;

  beforeEach(() => {
    store = { dispatch: jest.fn() };
    next = jest.fn();
    action = { type: '', payload: '' };
  });

  it('should handle WEBSOCKET_CONNECT', () => {
    action.type = 'WEBSOCKET_CONNECT';
    webSocketMiddleware(store)(next)(action);
    expect(websocketConnect).toHaveBeenCalled();
  });

  it('should handle WEBSOCKET_DISCONNECT', () => {
    action.type = 'WEBSOCKET_DISCONNECT';
    webSocketMiddleware(store)(next)(action);
    expect(websocketDisconnect).toHaveBeenCalled();
  });

  it('should handle WEBSOCKET_SEND_MESSAGE', () => {
    action.type = 'WEBSOCKET_SEND_MESSAGE';
    action.payload = 'test message';
    const result = webSocketMiddleware(store)(next)(action);
    expect(websocketSendMessage).toHaveBeenCalledWith(result, 'test message');
  });

  it('should pass unrecognized actions to next middleware', () => {
    action.type = 'UNRECOGNIZED_ACTION';
    webSocketMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
