import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { IUser, User } from '../models/userModel';
import { generateToken } from '../utils/token';


interface LoginRequestBody {
  email: string;
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

  private async findExistingUser(email: string): Promise<IUser | null> {
    return User.findOne({ email: email });
  }


  async register(req: Request, res: Response, next: NextFunction) {
    const { displayName, email, password } = req.body;

    try {

      if (!displayName || !email || !password) {
        return res.status(400).send('Please provide all required fields');

      }

      const existingUser = await this.findExistingUser(email);
      if (existingUser) {
        return res.status(409).send('Email address already exists');
      }


      const hashedPassword = await this.hashPassword(password);
      const user = new User({ displayName: displayName, email: email, password: hashedPassword });
      await user.save();

      const token = generateToken(user);
      return res.json({ token });


    } catch (err) {
      next(err);
    }

  }


  async login(req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send('Please provide all required fields');
      }
      const foundUser = await this.findExistingUser(email);
      if (!foundUser) {
        return res.status(401).send('Credentials are incorrect');
      }



      const isValidPassword = await bcrypt.compare(req.body.password, foundUser.password);

      if (!isValidPassword) {
        return res.status(401).send('Credentials are incorrect');
      }

      const token = generateToken(foundUser);
      return res.json({ token });

    } catch (error) {
     next(error);
    }
  }

}

export default new UserController();