import { Request, Response } from "express";
import AssetsService from "../services/AssetsService";
import CommonError from "@/app/Auth/exceptions/CommonError";

const AssetsController = () => {

  async function create(req: Request, res: Response): Promise<Response> {

    try {
      const ticker = req.body?.ticker;
      const assetData = await AssetsService().searchStockSymbol(ticker);

      const symbolPureData = assetData?.stocks[0];

      const { symbol } = symbolPureData;

      return res.status(200).json({
        ticker: symbol,
        symbols: symbolPureData
      });

    } catch (error) {
      const isCommonError = error instanceof CommonError;

      if (isCommonError) return res.status(401).send({ error: error.message });

      return res.status(404).json({ error: 'Not founded' });
    }

  }

  return { create }

}

export default AssetsController;