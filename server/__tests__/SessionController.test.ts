import request from 'supertest';
import express from 'express';
import sessionController from '../controller/SessionController';
import jwt from 'jsonwebtoken';
import { describe, it, expect } from '@jest/globals';

const app = express();
app.use(express.json());
app.post('/session', sessionController.createSession);

describe('SessionController', () => {

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/session').send();
    expect(response.status).toBe(401);
  });
});