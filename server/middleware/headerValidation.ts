import { Request, Response, NextFunction } from 'express'

export const headerValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const contentType = req.headers['content-type']

  if (!contentType || contentType !== 'application/json') {
    return res.status(400).send('Invalid Content-Type header')
  }

  next()
}
