import { Request, Response, NextFunction } from 'express';
import UserFormInterface from '@/app/Interfaces/UserFormInterface';

import AuthService from '@app/Auth/services/AuthService';
import AuthError from '@/app/Auth/exceptions/AuthError';


async function signOut(formData: UserFormInterface): Promise<void> {
  const { firstName, lastName, email, password } = formData;

}

export default async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  // Authorization: Bearer <token>
  const [, token] = authHeader.split(' ');

  try {
    const authService = AuthService();
    const id = await authService.validateToken(token);

    req.user = { id, token }

  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      return res.status(401).send({ error: 'Token invalid' });
    }

    return res.status(500).json({ error });
  }


  return next();
}