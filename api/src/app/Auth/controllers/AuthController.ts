import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import AuthError from "@app/Auth/exceptions/AuthError";


const AuthController = () => {

  const createProvider = async (req: Request, res: Response): Promise<Response> => {
    const { email, accountType } = req.body;


    try {
      const { user, token } = await AuthService().signInWithProvider(email, accountType);

      const objData = { user, token };
      // console.log('Account type: ', accountType)
      console.log(objData);

      return res.status(200).json(objData);

    } catch (error) {
      const isAuthError = error instanceof AuthError;

      if (isAuthError) return res.status(401).send({ error: error.message });

      return res.status(500).json({ error: 'Internal server error' });

    }
  }

  const create = async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService().signIn(email, password);

      const objData = { user, token };
      // console.log('Account type: ', accountType)
      console.log(objData);

      return res.status(200).json(objData);

    } catch (error) {
      const isAuthError = error instanceof AuthError;

      if (isAuthError) return res.status(401).send({ error: error.message });

      return res.status(500).json({ error: 'Internal server error' });

    }

  }

  const destroy = async (req: Request, res: Response): Promise<Response> => {

    const requestToken = req?.user?.token;
    console.log('request ', req.user);
    console.log('request token: ', requestToken);

    requestToken && AuthService().signOut(requestToken);

    return res.status(204).send();
  }

  return { create, createProvider, destroy }
}

export default AuthController;