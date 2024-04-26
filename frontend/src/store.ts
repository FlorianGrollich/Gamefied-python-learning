import { configureStore } from '@reduxjs/toolkit'
import codeReducer from './pages/MainPage/slices/codeSlice'
import authReducer from './slices/authSlice'
import playerReducer from './pages/MainPage/slices/playerSlice'

const store = configureStore({
  reducer: {
    code: codeReducer,
    auth: authReducer,
    player: playerReducer,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;