import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { PostgresDataSource } from "../utils/data-source";
import { User } from "../entity/User";
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {

    private userRepository = PostgresDataSource.getRepository(User);

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !user.validatePassword(password)) {
            return response.status(401).json({ error: "Invalid email or password" });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in .env file');
        }

        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

        return response.json({ token });
    }
}
