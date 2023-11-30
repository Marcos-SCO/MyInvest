import { Request, Response } from "express";
import AssetsService from "../services/AssetsService";
import CommonError from "@/app/Auth/exceptions/CommonError";

import AssetModel from "../models/AssetModel";
import AssetNasdaq from "../models/AssetNasdaq";
import errorMessageHelper from "@/app/helpers/ErrorHelper";
import TopAssetListModel from "../models/TopAssetListModel";

const TopAssetsController = () => {

  async function index(req: Request, res: Response): Promise<Response> {
    const { assetListTypeId } = req.body;

    try {

      const topAssets = await TopAssetListModel().getTopAssetsData({ assetListTypeId });

      if (!topAssets) {
        return res.status(404).json({
          error: true,
          message: 'Top assets not found',
        });
      }

      return res.status(200).json({
        message: 'Top assets found',
        topAssets,
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  return { index }

}

export default TopAssetsController;