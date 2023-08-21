import { Request, Response, NextFunction } from 'express';

import AuthService from '@app/Auth/services/AuthService';
import AuthError from '@/app/Auth/exceptions/AuthError';


export default async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  // Authorization: Bearer <token>
  const [, token] = authHeader.split(' ');

  try {
    const authService = AuthService();
    const id = await authService.validateToken(token);

    req.user = { id, token }

    return next();

  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      // console.log(error.message);
      return res.status(401).send({ error: error.message });
    }

    return res.status(500).json({ error });
  }

}