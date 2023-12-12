import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client';
import CommonError from "@/app/Auth/exceptions/CommonError";
import UserAssetsModel from "../models/UserAssetsModel";
import AuthError from "@/app/Auth/exceptions/AuthError";

import errorMessageHelper from '@app/helpers/ErrorHelper';

const prisma = new PrismaClient();

const UserAssetsController = () => {

  async function verifyUserAssetParams(res: Response, userId: any, assetId: any) {
    if (!userId) throw new CommonError(`userId param is missing`);
    if (!assetId) throw new CommonError(`assetId param is missing`);
  }

  async function create(req: Request, res: Response): Promise<Response> {
    const userId = req.body?.userId;
    const assetId = req.body?.assetId;

    const insertObj = { userId, assetId };

    try {
      await verifyUserAssetParams(res, userId, assetId);

      const insertedUserAsset = await
        UserAssetsModel().insertUserAsset(insertObj);

      return res.status(200).json({
        message: 'User asset was inserted successfully',
        insertedUserAsset
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  async function destroy(req: Request, res: Response): Promise<Response> {
    const userId = req.body?.userId;
    const assetId = req.body?.assetId;

    const insertObj = { userId, assetId };

    try {

      await verifyUserAssetParams(res, userId, assetId);

      const deleteUserAsset = await
        UserAssetsModel().deleteUserAsset(insertObj);

      return res.status(200).json({
        message: `Asset id: ${assetId} was delete from User id: ${userId}`,
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  async function index(req: Request, res: Response): Promise<Response> {
    const { userId, page = 1, numberOfItens = 10, getDetailedList = true, orderBy = 'desc' } = req.body;

    if (!userId) return res.status(404).json({ message: `userId param is missing`, });

    try {
      const assetsQuery: any = await UserAssetsModel().getAllByPagination(userId, {
        page,
        numberOfItens,
        getDetailedList,
        orderBy: { 'id': orderBy }
      });

      const { totalPages, totalAssetsCount, assetsQueryResults } = assetsQuery;

      const haveUserResults = assetsQueryResults?.length > 0;

      if (!haveUserResults) {
        return res.status(404).json({
          message: totalPages > 0 ? `No assets found, total number of pages is ${totalPages}` : `No assets found for userId: ${userId}`,
        });
      }

      const message = page > 1 ? `Page ${page} user found assets:` : 'User found assets';

      return res.status(200).json({
        message,
        totalPages,
        totalAssetsCount,
        assetsList: assetsQueryResults
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  async function searchUserAssetIds(req: Request, res: Response): Promise<Response> {
    const { userId, numberOfItens = 60 } = req.body;

    if (!userId) return res.status(404).json({ message: `userId param is missing`, });

    try {
      const assetsQuery: any = await UserAssetsModel().getUserAssetIds(userId, numberOfItens);

      const haveUserResults = assetsQuery?.length > 0;

      if (!haveUserResults) {
        return res.status(404).json({
          message: `No assets found for userId: ${userId}`,
        });
      }

      const message = `user assetIds found:`;

      return res.status(200).json({
        message,
        assetIds: assetsQuery,
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  return { index, searchUserAssetIds, create, destroy }

}

export default UserAssetsController;