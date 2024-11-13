import { combineReducers, configureStore } from '@reduxjs/toolkit';
import codeReducer from './pages/MainPage/slices/codeSlice';
import authReducer from './slices/authSlice';
import playerReducer from './pages/MainPage/slices/playerSlice';
import { socketMiddleware } from './pages/MainPage/slices/middleware';
import CustomSocket from './pages/MainPage/utils/socket';
import sessionReducer from './pages/MainPage/slices/sessionSlice';

const rootReducer = combineReducers({
  code: codeReducer,
  auth: authReducer,
  player: playerReducer,
  session: sessionReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware(new CustomSocket())),

});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
