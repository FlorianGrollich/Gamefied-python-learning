class WebSocketSessionModel {
  public code: string;
  public userSockets: WebSocket[];
  public userEmails: string[];

  constructor(code: string, userSockets: WebSocket[], userEmails: string[]) {
    this.code = code;
    this.userSockets = userSockets;
    this.userEmails = userEmails;
  }

  static createFromRedis(data: { [p: string]: string }) {
    const values = Object.values(data);
    console.log("code: ", )
    return new WebSocketSessionModel(values[2], JSON.parse(values[1]), JSON.parse(values[0]));
  }
}

export default WebSocketSessionModel;