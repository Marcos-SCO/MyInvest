import AuthError from "@app/Auth/exceptions/AuthError";
import Jwt from "jsonwebtoken";
import config from "@/config";

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import UserModel from "@/app/Users/models/UserModel";

const { secret, expiresIn } = config.auth;

const prisma = new PrismaClient();

const AuthService = () => {

  async function comparePasswords(providedPassword: string, hashedPassword: string) {
    const passwordsMatch = await bcrypt.compare(providedPassword, hashedPassword);

    return passwordsMatch;
  }


  async function signIn(email: String, password: String): Promise<{ user: object, token: string }> {

    const userData = await UserModel().getUserByEmail(email as string);

    const fullName = (userData?.firstName + ' ' + userData?.lastName);

    const { id } = userData;

    const userPassword =
      await UserModel().getHashedPassword(id);

    if (!userPassword) {
      throw new AuthError(`User don't have a hashed password...`);
    }

    const passwordConference = await comparePasswords(password as string, userPassword.password as string);

    if (!passwordConference) {
      throw new AuthError('Invalid credentials');
    }

    const token = Jwt.sign({ id }, secret as string, {
      expiresIn: expiresIn,
    });

    return {
      user: {
        id,
        fullName,
        email,
      },
      token
    }

  }

  async function validateToken(token: string): Promise<string> {
    try {
      const decoded = Jwt.verify(token, secret as string) as { id: string };

      return decoded.id;

    } catch (error) {
      throw new AuthError('Invalid token');
    }
  }

  return { signIn, validateToken }
}

export default AuthService;