import { NextFunction, Request, Response } from 'express';
import { Session } from '../models/sessionModel';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redisclient';




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

    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
      const session = new Session({ usersIds: [email], code: 'from player import Player' });
      await session.save();

      redisClient.hSet(`gameSession:${session._id}`, {
        userEmails: JSON.stringify([email]),
        code: session.code
      });

      res.status(201).json( {
        code: session.code,
        id: session._id
      });
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
  }
}

export default new SessionController();