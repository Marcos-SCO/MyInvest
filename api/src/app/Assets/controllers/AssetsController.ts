import { Request, Response } from "express";
import AssetsService from "../services/AssetsService";
import CommonError from "@/app/Auth/exceptions/CommonError";

import AssetModel from "../models/AssetModel";
import AssetNasdaq from "../models/AssetNasdaq";

const AssetsController = () => {

  async function insertAsset(insertObj: any) {
    const { type } = insertObj;

    const isNasdaq = type == 2;

    const symbols = isNasdaq ?
      await AssetNasdaq().insertAsset(insertObj) :
      await AssetModel().insertAsset(insertObj);

    return symbols;
  }

  async function show(req: Request, res: Response): Promise<Response> {
    // const ticker = req.body?.ticker as string;
    const ticker = (req.params?.ticker)
      .replace(/(^[\\/-]+)|([\\/-]+$)/g, '') as string;

    const type = AssetsService().getAssetTypeIdFromPathName(req.path);
    if (!type) throw new CommonError('Asset type not defined');

    try {

      let assetInDb: any | boolean = await AssetModel().getAssetWithDetailInfo(ticker);

      if (!assetInDb) assetInDb = await insertAsset({ ticker, type });

      return res.status(200).json({
        asset: assetInDb
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }
  }

  async function searchAssetsApiQuery(req: Request, res: Response): Promise<Response> {
    // const ticker = req.body?.ticker as string;
    const ticker = (req.params?.ticker)
      .replace(/(^[\\/-]+)|([\\/-]+$)/g, '') as string;

    try {

      // let assetInDb: any | boolean = await AssetModel().getAssetWithDetailInfo(ticker);

      // if (!assetInDb) assetInDb = AssetModel().getAssetApiData(ticker);

      const assetQuery = await AssetsService().searchSymbol(ticker);

      return res.status(200).json({
        data: assetQuery
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }
  }

  async function create(req: Request, res: Response): Promise<Response> {

    try {
      const ticker = req.body?.ticker;
      const type = req.body?.type ?? 1;

      const insertObj = { ticker, type };

      const symbols = await insertAsset(insertObj);

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

  async function update(req: Request, res: Response): Promise<Response> {
    try {
      const ticker = req.body?.ticker;

      let typeValue = req.body?.type;

      let assetFromDb: any;

      if (!typeValue) {
        assetFromDb = await AssetModel()
          .getAssetByTickerFromDb(ticker);

        typeValue = assetFromDb ? assetFromDb.type : 1;
      }

      const updateObj = { ticker, typeValue, passedAssetFromDb: assetFromDb }

      const isNasdaq = typeValue == 2;

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

      return res.status(404).json({ error: 'Not found' });
    }
  }

  async function destroy(req: Request, res: Response): Promise<Response> {

    try {
      const ticker = req.body?.ticker;

      const deleteObj = { ticker }

      const deletedAsset = await AssetModel().deleteAsset(deleteObj);

      return res.status(200).json({
        message: `Asset ${ticker} was deleted from DB`,
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      console.log(error);

      return res.status(404).json({ error: 'Not found' });
    }

  }

  return { show, create, update, destroy, searchAssetsApiQuery }

}

export default AssetsController;