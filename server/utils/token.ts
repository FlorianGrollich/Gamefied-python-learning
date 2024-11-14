import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';
import * as Sentry from '@sentry/node';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in your environment variables');
}

export function generateToken(user: IUser): string {
  if (process.env.JWT_SECRET === undefined) {
    Sentry.captureException(new Error('JWT_SECRET is not defined in your environment variables'));
    throw new Error('JWT_SECRET is not defined in your environment variables');
  }
  return jwt.sign({ displayName: user.displayName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
}