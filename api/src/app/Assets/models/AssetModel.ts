import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";
import AssetDetailsList from "./AssetDetailsList";
import AssetsService from "../services/AssetsService";

const prisma = new PrismaClient();

const AssetModel = () => {

  async function getAssetById(id: number) {
    const assetInDb = await prisma.assets.findUnique({
      where: { id }
    });

    if (!assetInDb) return false;

    return assetInDb;
  }

  async function getAssetByTickerFromDb(ticker: string) {
    const assetInDb = await prisma.assets.findFirst({
      where: { name: ticker }
    });

    if (!assetInDb) return false;

    return assetInDb;
  }

  async function getDividendHistoryData(ticker: string, type: number) {
    const date = new Date();
    const currentYear = date.getFullYear();

    const initialYear = currentYear - 5;
    const finalYear = currentYear + 1;

    return await AssetsService().getDividendHistory(ticker, `${initialYear}-01-01`, `${finalYear}-01-01`, type);

  }

  async function getAssetApiData(ticker: string, type = 1) {
    const assetData = await AssetsService().searchSymbol(ticker, type);

    const assetType: any = { 1: 'stocks', 3: 'fiis', }

    const historicalDividends = await getDividendHistoryData(ticker, type);

    const objResultName = assetType[type];
    const symbolPureData = assetData?.[objResultName][0];

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

    const { symbolData, lastPrice, historicalDividends } = await AssetModel().getAssetApiData(ticker, type);

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

    let assetAlreadyInDb = await getAssetByTickerFromDb(ticker);

    if (!assetAlreadyInDb) throw new CommonError(`${ticker} don't exists in details list`);

    const assetId = assetAlreadyInDb.id;

    const { symbolData, lastPrice, historicalDividends } =
      await getAssetApiData(ticker, type);

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

  return { insertAsset, updateAsset, getAssetByTickerFromDb, getAssetById, getAssetApiData, getDividendHistoryData };
}

export default AssetModel;