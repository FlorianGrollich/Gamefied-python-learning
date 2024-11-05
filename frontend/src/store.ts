import { combineReducers, configureStore } from '@reduxjs/toolkit';
import codeReducer from './pages/MainPage/slices/codeSlice';
import authReducer from './slices/authSlice';
import playerReducer from './pages/MainPage/slices/playerSlice';
import socketReducer from './pages/MainPage/slices/socketSlice';
import { socketMiddleware } from 'pages/MainPage/slices/middleware';

const rootReducer = combineReducers({
  code: codeReducer,
  auth: authReducer,
  player: playerReducer,
  socket: socketReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware),

});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
