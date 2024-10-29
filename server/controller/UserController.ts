import { NextFunction, Request, Response } from 'express';
import { PostgresDataSource } from '../utils/data-source';
import * as bcrypt from 'bcrypt';

import * as jwt from 'jsonwebtoken';
import { IUser, User } from '../models/userModel';


interface LoginRequestBody {
  username: string;
  password: string;
}

class UserController {

  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }


  async register(req: Request, res: Response, next: NextFunction) {
    const { displayName, email, password } = req.body;
    console.log('req.body:', req.body);

    const hashedPassword = await bcrypt.hash(password, 12);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log('user found');
      res.status(409).send('Email address already exists');
      return;
    }
    try {

      const user = new User({ displayName: displayName, email: email, password: hashedPassword });
      await user.save();
      if (process.env.JWT_SECRET === undefined) {
        throw new Error('JWT_SECRET is not set');
      }
      const token = jwt.sign({ displayName: user?.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error during user registration. Please try again later.`);
      return;
    }

  }


  async login(req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) {
    console.log(req.body);
    const { username, password } = req.body;
    try {
      console.log('username:', req.body.username);


      const isValidPassword = await bcrypt.compare(req.body.password, 'TODO');

      console.log(isValidPassword);
      if (!isValidPassword) {
        res.status(401).send('Credentials are incorrect');
        return;
      }

      const token = jwt.sign({ userName: 'TODO' }, 'yourSecretKey', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  }

}

export default new UserController();