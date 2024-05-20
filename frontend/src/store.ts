import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './pages/MainPage/slices/codeSlice';
import authReducer from './slices/authSlice';
import playerReducer from './pages/MainPage/slices/playerSlice';
import { webSocketMiddleware } from '../src/pages/MainPage/middleware/websocketMiddleware';

const store = configureStore({
  reducer: {
    code: codeReducer,
    auth: authReducer,
    player: playerReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(webSocketMiddleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
