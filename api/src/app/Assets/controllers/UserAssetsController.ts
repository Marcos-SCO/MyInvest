import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client';
import UserModel from "../../Users/models/UserModel";
import CommonError from "@/app/Auth/exceptions/CommonError";
import UserAssetsModel from "../models/UserAssetsModel";
import AuthError from "@/app/Auth/exceptions/AuthError";

const prisma = new PrismaClient();

const UserAssetsController = () => {

  async function create(req: Request, res: Response): Promise<Response> {
    const userId = req.body?.userId;
    const assetId = req.body?.assetId;

    if (!userId) return res.status(404).json({ message: `userId param is missing`, });

    if (!assetId) return res.status(404).json({ message: `assetId param is missing`, });

    const insertObj = { userId, assetId };

    try {
      const insertedUserAsset = await
        UserAssetsModel().insertUserAsset(insertObj);

      return res.status(200).json({
        message: 'User asset was inserted successfully',
        insertedUserAsset
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError || error instanceof AuthError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }

  }

  async function destroy(req: Request, res: Response): Promise<Response> {
    const userId = req.body?.userId;
    const assetId = req.body?.assetId;

    if (!userId) return res.status(404).json({ message: `userId param is missing`, });

    if (!assetId) return res.status(404).json({ message: `assetId param is missing`, });

    const insertObj = { userId, assetId };

    try {
      const deleteUserAsset = await
        UserAssetsModel().deleteUserAsset(insertObj);

      return res.status(200).json({
        message: `Asset id: ${assetId} was delete from User id: ${userId}`,
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError || error instanceof AuthError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }

  }

  async function index(req: Request, res: Response): Promise<Response> {
    const { userId, page = 1, numberOfItens = 10 } = req.body;

    if (!userId) return res.status(404).json({ message: `userId param is missing`, });

    const assets: any = await UserAssetsModel().getAllByPagination(userId, {
      page,
      numberOfItens,
      orderBy: { 'id': 'desc' }
    });

    const haveUserResults = assets.length > 0;

    if (!haveUserResults) {
      return res.status(404).json({
        message: 'No assets was founded',
      });
    }

    const message = page > 1 ? `Page ${page} user found assets:`: 'User found assets' ;

    return res.status(200).json({
      message,
      assetList: assets
    });

  }

  return { index, create, destroy }

}

export default UserAssetsController;