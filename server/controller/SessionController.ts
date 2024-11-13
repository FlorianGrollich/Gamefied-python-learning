import { NextFunction, Request, Response } from 'express';
import { Session } from '../models/sessionModel';
import jwt from 'jsonwebtoken';




class SessionController {

  constructor() {
    this.createSession = this.createSession.bind(this);
  }


  async createSession(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send('Unauthorized');
    }

    //get token from authHeader
    const token = authHeader.split(' ')[1];
    console.log(authHeader);
    console.log(token);
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
      const session = new Session({ usersIds: [email], code: '1234' });
      await session.save();
      res.status(201).json(session);
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
  }
}

export default new SessionController();