class WebSocketSessionModel {
  public code: string;
  public userSockets: WebSocket[];
  public userEmails: string[];

  constructor({ code, userSockets, userEmails }: { code: string; userSockets: WebSocket[]; userEmails: string[] }) {
    this.code = code;
    this.userSockets = userSockets;
    this.userEmails = userEmails;
  }

  static createFromRedis(data: { [p: string]: string }) {
    return new WebSocketSessionModel({code: data["code"], userEmails: JSON.parse(data["userEmails"]), userSockets: JSON.parse(data["userSockets"])});
  }
}

export default WebSocketSessionModel;