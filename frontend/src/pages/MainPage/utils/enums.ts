export enum PlayerAction {
  MOVE = 'Move',
}

export function isEnumValue(value: string, enumeration: any): boolean {
  return Object.values(enumeration).includes(value);
}

export enum WebSocketEventType {
  OPEN = "open",
  MESSAGE = "message",
  CLOSE = "close"
}

export enum WebSocketActionType {
  SOCKET_CONNECT= "socket/connect",
  SOCKET_DISCONNECT = "socket/disconnect"
}
