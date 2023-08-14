import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import AuthError from "@app/Auth/exceptions/AuthError";


const AuthController = () => {

  const create = async (req: Request, res: Response): Promise<Response> => {
    
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService().signIn(email, password);

      return res.status(200).json({ user, token });

    } catch (error) {
      const isAuthError = error instanceof AuthError;

      if (isAuthError) return res.status(401).send({ error: error.message });

      return res.status(500).json({ error: 'Internal server error' });

    }

  }

  const destroy = async () => {

  }

  return { create, destroy }
}

export default AuthController;