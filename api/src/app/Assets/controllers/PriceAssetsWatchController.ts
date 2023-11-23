import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client';
import CommonError from "@/app/Auth/exceptions/CommonError";
import AuthError from "@/app/Auth/exceptions/AuthError";

import PriceAssetsWatchModel from "../models/PriceAssetsWatchModel";

import errorMessageHelper from '@app/helpers/ErrorHelper';

const prisma = new PrismaClient();

const PriceAssetsWatchController = () => {

  async function verifyParamsPriceAssets(res: Response, userId: any, assetId: any, expectedPrice: any) {
    if (!userId) throw new CommonError(`userId param is missing`);
    if (!assetId) throw new CommonError(`assetId param is missing`);
    if (!expectedPrice) throw new CommonError(`expectedPrice param is missing`);
  }

  async function show(req: Request, res: Response): Promise<Response> {

    const { priceAlertId, assetId, userId, expectedPrice, priceAlertTypeId = 1 } = req.body;

    const dataObj = {
      assetId,
      userId,
      expectedPrice,
      priceAlertId,
      priceAlertTypeId
    }

    try {

      let assetReachExpectedPrice = await PriceAssetsWatchModel().assetReachedExpectedPrice(dataObj);

      return res.status(200).json({
        assetReachExpectedPrice
      });

    } catch (error) {

      return errorMessageHelper(res, error, { customMessage: `Asset alert was not found` });
    }
  }

  async function create(req: Request, res: Response): Promise<Response> {

    const userId = req.body?.userId;
    const assetId = req.body?.assetId;

    const priceAlertTypeId =
      +(req.body?.priceAlertTypeId ?? 1);
      
    const expectedPrice = req.body?.expectedPrice;

    const insertObj = { userId, assetId, expectedPrice, priceAlertTypeId };

    try {
      await verifyParamsPriceAssets(res, userId, assetId, expectedPrice);

      const insertedPriceWatch = await
        PriceAssetsWatchModel().insertPriceAlert(insertObj);

      return res.status(200).json({
        message: 'Price asset watch was insert successfully',
        insertedPriceWatch
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  async function destroy(req: Request, res: Response): Promise<Response> {
    const alertId = req.body?.alertId;
    const softDelete = req.body?.softDelete ?? false;

    const deleteObj = { alertId, softDelete };

    if (!alertId) {
      return res.status(404).json({
        message: 'alertId param is missing',
      });
    }

    const message = softDelete ? `Alert status for id ${alertId} was update` : `Alert id: ${alertId} was delete`;

    try {
      const deletedPriceAlert = await PriceAssetsWatchModel().deletePriceAlert(deleteObj);

      return res.status(200).json({
        message,
        deletedPriceAlert
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  async function index(req: Request, res: Response): Promise<Response> {
    const { page = 1, numberOfItens = 10, orderBy = 'desc', getDetailedList = false } = req.body;

    const userId = req.body?.userId;

    const searchByStatus = req.body?.searchByStatus;
    const active = req.body?.active ?? true;

    let paginationObj: any = {
      page,
      numberOfItens,
      getDetailedList,
      orderBy: { 'updatedAt': orderBy }
    }

    if (userId) paginationObj = { ...paginationObj, userId };

    if (searchByStatus) paginationObj = { ...paginationObj, searchByStatus, active };

    try {
      const assetsQuery = await PriceAssetsWatchModel().getAllByPagination(paginationObj);

      const { totalPages, totalAlertsCount, priceAlertResults } = assetsQuery;

      const haveUserResults = priceAlertResults?.length > 0;

      if (!haveUserResults) {
        return res.status(404).json({
          message: totalPages > 0 ? `No alerts found, total number of pages is ${totalPages}` : `No alerts found`,
        });
      }

      const message = page > 1 ? `Page ${page} price alerts:` : 'Price alerts found';

      return res.status(200).json({
        message,
        totalPages,
        totalAlertsCount,
        priceAlertsList: priceAlertResults
      });

    } catch (error) {
      return errorMessageHelper(res, error);
    }

  }

  return { index, create, destroy, show }

}

export default PriceAssetsWatchController;