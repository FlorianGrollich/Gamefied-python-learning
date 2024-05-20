import { Dispatch } from 'redux'
import { doActions } from '../../slices/playerSlice'
import { onMessage } from './messageHandler'

const onOpen = (dispatch: Dispatch) => () => {
  console.log('WebSocket Connected')
}

const onClose = (dispatch: Dispatch) => () => {
  console.log('WebSocket Disconnected')
}

interface websocketConnectProps {
  store: any
  socket: WebSocket | null
}

const websocketConnect = ({ store, socket }: websocketConnectProps) => {
  if (socket !== null) {
    socket.close()
  }
  socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`)
  socket.onopen = onOpen(store.dispatch)
  socket.onclose = onClose(store.dispatch)
  socket.onmessage = onMessage(store.dispatch)
  return socket
}

export default websocketConnect
