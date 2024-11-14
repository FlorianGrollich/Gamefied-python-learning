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

type WebSocketMessageDTO = WebSocketActionMessageDTO | WebSocketCodeMessageDTO | WebSocketCodeChangeMessageDTO;

export default WebSocketMessageDTO;