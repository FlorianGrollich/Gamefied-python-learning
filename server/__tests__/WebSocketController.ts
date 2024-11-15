import WebSocket, { WebSocketServer } from 'ws';
import { RedisClientType } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/node';
import { describe, it, expect, beforeEach, jest, afterEach } from '@jest/globals';
import WebSocketController from '../controller/WebSocketController';
jest.mock('ws');
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
jest.mock('@sentry/node');

describe('WebSocketController', () => {
  let mockServer: WebSocketServer;
  let mockRedisClient: RedisClientType;
  let controller: WebSocketController;
  let mockWebSocket: WebSocket;

  beforeEach(() => {
    mockServer = new WebSocketServer({ port: 8081 });
    mockRedisClient = {
      keys: jest.fn(),
      hGetAll: jest.fn(),
      hSet: jest.fn(),
    } as unknown as RedisClientType;
    controller = new WebSocketController(mockServer, mockRedisClient);
    mockWebSocket = new WebSocket('ws://localhost:8081');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle new connection', () => {
    const wsId = 'test-uuid';
    (uuidv4 as jest.Mock).mockReturnValue(wsId);

    controller.handleConnection(mockWebSocket);

    expect(controller.clients.has(wsId)).toBe(true);
    expect(mockWebSocket.send).toHaveBeenCalledWith('Hello from Backend!');
  });




});