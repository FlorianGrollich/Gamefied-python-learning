import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3200;
export const JWT_SECRET = process.env.JWT_SECRET;