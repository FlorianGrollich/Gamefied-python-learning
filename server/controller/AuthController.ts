import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PostgresDataSource } from "../utils/data-source";
import { User } from "../entity/User";

export class AuthController {

    private userRepository = PostgresDataSource.getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            // Use the `where` property for the email condition
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return response.status(401).json({ error: "Invalid email or password" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
            if (!isPasswordValid) {
                return response.status(401).json({ error: "Invalid email or password" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return response.json({ token });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }
}
