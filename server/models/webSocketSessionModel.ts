class WebSocketSessionModel {
  public code: string;
  public userSocketIds: string[];
  public userEmails: string[];

  constructor({ code, userSocketIds, userEmails }: { code: string; userSocketIds: string[]; userEmails: string[] }) {
    this.code = code;
    this.userSocketIds = userSocketIds;
    this.userEmails = userEmails;
  }

  checkIfWebSocketExists(wsId: string) {
    return this.userSocketIds.includes(wsId);
  }

  static createFromRedis(data: { [p: string]: string }) {
    return new WebSocketSessionModel({ code: data["code"], userEmails: JSON.parse(data["userEmails"]), userSocketIds: JSON.parse(data["userSocketIds"]) });
  }
}

export default WebSocketSessionModel;