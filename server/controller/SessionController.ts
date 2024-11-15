import { NextFunction, Request, Response } from 'express';
import { Session } from '../models/sessionModel';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redisclient';
import * as Sentry from '@sentry/node';

class SessionController {

  constructor() {
    this.createSession = this.createSession.bind(this);
  }


  async createSession(req: Request, res: Response, next: NextFunction) {
    await Sentry.startSpan({
      name: 'createSession',
    }, async (span: any) => {
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

        await redisClient.hSet(`gameSession:${session._id}`, {
          userSocketIds: JSON.stringify([]),
          code: session.code,
          userEmails: JSON.stringify([email]),
        });

        res.status(201).json({
          code: session.code,
          id: session._id,
        });
      } catch (err) {
        res.status(401).send('Unauthorized');
      }
    })


  }
}

export default new SessionController();