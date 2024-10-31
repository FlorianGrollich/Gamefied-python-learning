export interface CodeMessage {
  type: 'code';
  code: string;
}

export type WebSocketMessage = CodeMessage;