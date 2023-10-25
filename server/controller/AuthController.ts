import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PostgresDataSource } from "../utils/data-source";
import { User } from "../entity/User";
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {

    private userRepository = PostgresDataSource.getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return response.status(401).json({ error: "Invalid email or password" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
            if (!isPasswordValid) {
                return response.status(401).json({ error: "Invalid email or password" });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET is not defined in .env file');
            }

            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
            return response.json({ token });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }
}
