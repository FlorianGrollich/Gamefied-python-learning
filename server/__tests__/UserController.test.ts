import express from 'express';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import { mock, MockProxy } from 'jest-mock-extended';
import { User } from '../models/userModel';
import UserController from '../controller/UserController';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());
app.post('/login', UserController.login);

describe('UserController', () => {
  let userMock: MockProxy<typeof User>;

  beforeEach(() => {
    userMock = mock<typeof User>();
    jest.spyOn(User, 'findOne').mockImplementation(userMock.findOne);
  });

  it('should return 400 if no email is provided', async () => {
    const response = await request(app).post('/login').send({ password: 'password' });
    expect(response.status).toBe(400);
  });

  it('should return 401 if user is not found', async () => {
    userMock.findOne.mockResolvedValue(null);
    const response = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
    expect(response.status).toBe(401);
  });

  it('should return 200 if login is successful', async () => {
    userMock.findOne.mockResolvedValue({
      email: 'test@example.com',
      password: await bcrypt.hash('password', 12),
    });
    const response = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
    expect(response.status).toBe(200);
  });
});