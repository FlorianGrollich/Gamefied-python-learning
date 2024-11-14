class WebSocketSessionModel {
  public code: string;
  public userSockets: WebSocket[];
  public userEmails: string[];

  constructor() {
    this.code = "";
    this.userSockets = [];
    this.userEmails = [];
  }
}

export default WebSocketSessionModel;