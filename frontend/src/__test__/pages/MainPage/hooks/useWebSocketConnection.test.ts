import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import useWebSocketConnection from '../../../../pages/MainPage/hooks/useWebsocketConnection';
import {
  connectWebSocket,
  disconnectWebSocket,
} from '../../../../pages/MainPage/middleware/websocketMiddleware';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('useWebSocketConnection', () => {
  it('should dispatch connect and disconnect actions on mount and unmount', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    const { unmount } = renderHook(() => useWebSocketConnection());

    expect(mockDispatch).toHaveBeenCalledWith(connectWebSocket());

    unmount();

    expect(mockDispatch).toHaveBeenCalledWith(disconnectWebSocket());
  });
});
