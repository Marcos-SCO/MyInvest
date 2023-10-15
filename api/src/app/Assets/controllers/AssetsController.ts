import { Request, Response } from "express";
import AssetsService from "../services/AssetsService";
import CommonError from "@/app/Auth/exceptions/CommonError";
import AssetModel from "../models/AssetModel";

const AssetsController = () => {

  async function update(req: Request, res: Response): Promise<Response> {
    try {
      const ticker = req.body?.ticker;

      const updateObj = { ticker }

      const assetDetails = await AssetModel().updateAsset(updateObj);

      return res.status(200).json({
        ticker,
        assetDetails
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      return res.status(404).json({ error: 'Not founded' });
    }
  }

  async function create(req: Request, res: Response): Promise<Response> {

    try {
      const ticker = req.body?.ticker;

      const insertObj = { ticker }

      const symbols = await AssetModel().insertAsset(insertObj);

      return res.status(200).json({
        ticker,
        symbols
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      return res.status(404).json({ error: 'Not founded' });
    }

  }

  return { create, update }

}

export default AssetsController;