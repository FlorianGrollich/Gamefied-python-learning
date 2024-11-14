export interface WebSocketActionMessageDTO {
  type: 'action',
  actions: string[]
}

export interface WebSocketCodeMessageDTO {
  type: 'code',
  code: string;
}

export interface WebSocketCodeChangeMessageDTO {
  type: 'codeChange',
  sessionId: string
  code: string;
}

export interface WebSocketLoadGameMessageDTO {
  type: 'loadGame',
  sessionId: string;
}

export interface WebSocketErrorMessageDTO {
  type: 'error',
  message: string;
}

type WebSocketMessageDTO =
  WebSocketActionMessageDTO
  | WebSocketCodeMessageDTO
  | WebSocketCodeChangeMessageDTO
  | WebSocketLoadGameMessageDTO
  | WebSocketErrorMessageDTO;


export default WebSocketMessageDTO;