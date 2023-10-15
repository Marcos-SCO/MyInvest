import { Request, Response } from "express";
import AssetsService from "../services/AssetsService";
import CommonError from "@/app/Auth/exceptions/CommonError";

import AssetModel from "../models/AssetModel";
import AssetNasdaq from "../models/AssetNasdaq";

const AssetsController = () => {

  async function update(req: Request, res: Response): Promise<Response> {
    try {
      const ticker = req.body?.ticker;
      const type = req.body?.type ?? 1;

      const updateObj = { ticker, type }

      const isNasdaq = type == 2;

      const assetDetails = isNasdaq ?
        await AssetNasdaq().updateAsset(updateObj) :
        await AssetModel().updateAsset(updateObj);

      return res.status(200).json({
        ticker,
        assetDetails
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not founded' });
    }
  }

  async function create(req: Request, res: Response): Promise<Response> {

    try {
      const ticker = req.body?.ticker;
      const type = req.body?.type ?? 1;

      const insertObj = { ticker, type }

      const isNasdaq = type == 2;

      const symbols = isNasdaq ?
        await AssetNasdaq().insertAsset(insertObj) :
        await AssetModel().insertAsset(insertObj);

      return res.status(200).json({
        ticker,
        symbols
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }

  }

  return { create, update }

}

export default AssetsController;