import { Request, Response } from "express";

import UserService from "@/app/Users/services/UserService";
import AuthError from "@/app/Auth/exceptions/AuthError";

import { PrismaClient } from '@prisma/client';
import UserModel from "../models/UserModel";

import commonErrorMessageHelper from '@app/helpers/ErrorHelper';
import errorMessageHelper from "@app/helpers/ErrorHelper";

const prisma = new PrismaClient();

const UsersController = () => {

  async function create(req: Request, res: Response): Promise<Response> {
    try {
      const { user } = await UserService().SignUp(req.body);

      return res.status(200).json({ user });

    } catch (error) {
      const isAuthError = error instanceof AuthError;

      if (isAuthError) return res.status(401).send({ error: error.message });

      return res.status(500).json({ error: 'internal server error' });
    }
  }

  async function edit(req: Request, res: Response): Promise<Response> {

    try {
      const updatedUser = await UserModel().updateUser(req.body);

      const { id } = updatedUser;

      console.log(`User ${id} updated successfully`);

      return res.status(200).json({
        message: `User ${id} updated successfully`
      });

    } catch (error) {
      return commonErrorMessageHelper(res, error, { customMessage: 'Error when updating user' });
    }
  }

  async function destroy(req: Request, res: Response): Promise<Response> {

    try {
      const deletedUser = await UserModel().deleteUser(req.body);

      const { id } = deletedUser;

      const userEmail =
        deletedUser?.UserEmail?.map(({ email }) => email);

      console.log(`User id: ${id} | email: ${userEmail} Was deleted successfully`);

      return res.status(200).json({
        message: `User id: ${id} | email: ${userEmail} Was deleted successfully`
      });

    } catch (error) {

      return errorMessageHelper(res, error, { errorMessageHelper: 'Error deleting user' })

    }
  }

  async function findOneByEmail(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({
        message: 'Email param was not provided',
      });
    }

    try {
      const userEmailData = await
        UserModel().getEmail(email);

      return res.status(200).json({
        emailFound: true,
        email: userEmailData
      });

    } catch (error) {

      const isAuthError = error instanceof AuthError;

      if (isAuthError) return res.status(404).json({
        emailFound: false,
        message: error.message,
      });

    }

  }

  async function getOneById(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    const objData = {
      where: {
        id: +id
      },
      include: {
        UserEmail: true,
      },
    };

    const userData = await prisma.users.findUnique(objData);

    // const haveUserResults = userData.length > 0;

    if (!userData) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      user: userData
    });
  }

  async function index(req: Request, res: Response): Promise<Response> {
    const { page = 1, numberOfItens = 10 } = req.params;

    const users: any = await UserModel().getAllByPagination({
      page,
      numberOfItens,
      orderBy: { 'id': 'desc' }
    });

    const haveUserResults = users.length > 0;

    if (!haveUserResults) {
      return res.status(404).json({
        message: 'No user was founded',
      });
    }

    return res.status(200).json({
      users: users
    });

  }

  return { index, create, edit, destroy, getOneById, findOneByEmail }

}

export default UsersController;