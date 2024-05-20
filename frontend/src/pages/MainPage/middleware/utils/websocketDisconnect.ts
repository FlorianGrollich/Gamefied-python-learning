const websocketDisconnect = (socket: WebSocket | null) => {
  if (socket !== null) {
    socket.close();
  }
  socket = null;
};

export default websocketDisconnect;
