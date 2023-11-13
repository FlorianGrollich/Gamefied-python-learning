import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { PostgresDataSource } from '../utils/data-source';
import { User } from '../entity/User';
import { validateEmailInput, validatePasswordInput } from './../utils/validation';

dotenv.config();

export class AuthController {
  private userRepository = PostgresDataSource.getRepository(User);

  constructor() {
    this.login = this.login.bind(this);
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const { errors: emailErrors, isValid: isEmailValid } = validateEmailInput(email);
      const { errors: passwordErrors, isValid: isPasswordValid } = validatePasswordInput(password);
      if (!isEmailValid || !isPasswordValid) {
        return response.status(400).json({ email: emailErrors, password: passwordErrors });
      }

      const user = await this.userRepository.findOne({ where: { email } });
      if (!user || !user.validatePassword(password)) {
        return response.status(401).json({ error: 'Invalid email or password' });
      }

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        console.error('JWT_SECRET is not set');
        return response.status(500).json({ error: 'Internal server error' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return response.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
