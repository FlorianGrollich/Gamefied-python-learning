import Socket from 'pages/MainPage/utils/socket';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  socket: Socket
}

const initialState: SocketState = {
  socket: new Socket("ws//localhost:3200")
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
});


export default socketSlice.reducer;