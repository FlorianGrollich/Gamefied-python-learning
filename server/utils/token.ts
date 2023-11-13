import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in your environment variables');
}

export const generateToken = (userId: number, email: string): string => {
    return jwt.sign(
        { userId, email },
        secretKey,
        { expiresIn: '24h' }
    );
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
};
