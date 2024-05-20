import { WebSocketActionTypes } from './utils/ActionTypes'
import websocketConnect from './utils/websocketConnect'
import websocketDisconnect from './utils/websocketDisconnect'
import websocketSendMessage from './utils/websocketSendMessage'

export const connectWebSocket = () => ({
  type: WebSocketActionTypes.WEBSOCKET_CONNECT,
})
export const disconnectWebSocket = () => ({
  type: WebSocketActionTypes.WEBSOCKET_DISCONNECT,
})
export const sendMessage = (message: string) => ({
  type: WebSocketActionTypes.WEBSOCKET_SEND_MESSAGE,
  payload: message,
})
export const receiveMessage = (message: string) => ({
  type: WebSocketActionTypes.WEBSOCKET_RECEIVE_MESSAGE,
  payload: message,
})

export const webSocketMiddleware = (() => {
  let socket: WebSocket | null = null

  return (store: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case WebSocketActionTypes.WEBSOCKET_CONNECT:
        socket = websocketConnect({ store, socket })
        console.log('socket: ', socket)
        break
      case WebSocketActionTypes.WEBSOCKET_DISCONNECT:
        websocketDisconnect(socket)
        break
      case WebSocketActionTypes.WEBSOCKET_SEND_MESSAGE:
        console.log('sendMessage')
        websocketSendMessage(socket, action.payload)
        break
      default:
        return next(action)
    }
  }
})()
