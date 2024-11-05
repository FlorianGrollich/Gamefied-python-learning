import CustomSocket from 'pages/MainPage/utils/socket';
import { Middleware } from '@reduxjs/toolkit';
import { WebSocketActionType } from 'pages/MainPage/utils/enums';
import { RootState } from 'store';

export const socketMiddleware: Middleware<
  {},
  RootState
> = (storeApi, ) => next => type => {
  const state = storeApi.getState()
  const dispatch = storeApi.dispatch;

  switch (type) {
    case WebSocketActionType.SOCKET_CONNECT:

  }


}