import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";
import AssetDetailsList from "./AssetDetailsList";
import AssetsService from "../services/AssetsService";

const prisma = new PrismaClient();

const AssetModel = () => {

  async function getAssetByTickerFromDb(ticker: string) {
    const assetInDb = await prisma.assets.findFirst({
      where: { name: ticker }
    });

    if (!assetInDb) return false;

    return assetInDb;
  }

  async function getAssetApiData(ticker: string) {
    const assetData = await AssetsService().searchStockSymbol(ticker);

    const date = new Date();
    const currentYear = date.getFullYear();

    const initialYear = currentYear - 5;
    const finalYear = currentYear + 1;

    const historicalDividends = await AssetsService().getDividendHistory(ticker, `${initialYear}-01-01`, `${finalYear}-01-01`);

    const symbolPureData = assetData?.stocks[0];

    const { lastPrice } = symbolPureData;

    const apiObjData = {
      symbolData: symbolPureData,
      lastPrice,
      historicalDividends,
    }

    return apiObjData;
  }

  async function insertAsset(insertObj: any) {
    const { ticker, type = 1 } = insertObj;

    let assetAlreadyInDb = await getAssetByTickerFromDb(ticker);
    if (assetAlreadyInDb) throw new CommonError(`${ticker} already exists`);

    const { symbolData, lastPrice, historicalDividends } = await AssetModel().getAssetApiData(ticker);

    try {

      const insertAssetItem = await prisma.assets.create({
        data: { name: ticker, type, }
      });

      const assetId = insertAssetItem.id;

      const assetDetailsObj = {
        assetId,
        currentDividend: JSON.stringify(lastPrice),
        symbols: JSON.stringify(symbolData),
        historicalDividends: JSON.stringify(historicalDividends),
      }

      const assetDetailsList = await AssetDetailsList()
        .createAssetDetails(assetDetailsObj);

      return assetDetailsList;

    } catch (error) {
      // console.log(error);
      throw new CommonError(`Error creating Asset Item`);
    } finally {
      await prisma.$disconnect();
    }

  }

  async function updateAsset(updateObj: any) {
    const { ticker, type = 1 } = updateObj;

    let assetAlreadyInDb = await AssetModel()
      .getAssetByTickerFromDb(ticker);

    if (!assetAlreadyInDb) throw new CommonError(`${ticker} don't exists in details list`);

    const assetId = assetAlreadyInDb.id;

    const { symbolData, lastPrice, historicalDividends } = await AssetModel().getAssetApiData(ticker);

    try {
      const assetDetailsObj = {
        assetId,
        currentDividend: JSON.stringify(lastPrice),
        symbols: JSON.stringify(symbolData),
        historicalDividends: JSON.stringify(historicalDividends),
      }

      const assetDetailsList = await AssetDetailsList()
        .updateAssetDetails(assetId, assetDetailsObj);

      return assetDetailsList;

    } catch (error) {
      // console.log(error);
      throw new CommonError(`Error updating Asset Item`);
    } finally {
      await prisma.$disconnect();
    }

  }

  return { insertAsset, updateAsset, getAssetByTickerFromDb, getAssetApiData };
}

export default AssetModel;