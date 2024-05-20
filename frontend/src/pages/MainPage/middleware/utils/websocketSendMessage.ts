const websocketSendMessage = (socket: WebSocket | null, message: string) => {
  socket?.send(message)
}

export default websocketSendMessage
