import { Request, Response, NextFunction } from 'express';
import httpstatus from 'http-status-codes';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/jwt';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (request.url === '/auth/login') {
    return next();
  }

  if (!authHeader) {
    throw new Error('Acesso não permitido');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);

    return next();
  } catch (error) {
    return response.status(httpstatus.UNAUTHORIZED).json(error.message);
  }
}
