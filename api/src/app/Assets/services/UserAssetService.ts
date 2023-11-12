import { Request, Response } from "express";
import AuthError from "@/app/Auth/exceptions/AuthError";
import CommonError from "@/app/Auth/exceptions/CommonError";
import UserAssetsModel from "../models/UserAssetsModel";


const UserAssetsService = () => {

  async function verifyIfUserHasAsset(req: Request, res: Response): Promise<Response> {
    const userId = req.body?.userId;
    const assetId = req.body?.assetId;

    try {
      if (!userId) throw new CommonError(`userId param is missing`);
      if (!assetId) throw new CommonError(`assetId param is missing`);

      const userAssetQuery = await UserAssetsModel().getUserAsset(userId, assetId);

      if (!userAssetQuery) {
        return res.status(404).json({
          userHasAsset: false,
          message: `User don't have asset ${assetId}`,
        });
      }

      return res.status(200).json({
        userHasAsset: true,
        message: 'User has asset',
        userAssetQuery
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError || error instanceof AuthError;

      if (isCommonError) return res.status(401).json({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }

  }

  return { verifyIfUserHasAsset }

}


export default UserAssetsService;