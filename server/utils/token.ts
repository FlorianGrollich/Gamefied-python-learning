import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in your environment variables');
}

export function generateToken(user: IUser): string {
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign({ displayName: user.displayName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
}


export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};
