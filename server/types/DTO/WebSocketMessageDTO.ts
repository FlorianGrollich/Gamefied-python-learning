export interface WebSocketActionMessageDTO {
  type: 'action',
  actions: string[]
}

export interface WebSocketCodeMessageDTO {
  type: 'code',
  code: string;
}

type WebSocketMessageDTO = WebSocketActionMessageDTO | WebSocketCodeMessageDTO;

export default WebSocketMessageDTO;