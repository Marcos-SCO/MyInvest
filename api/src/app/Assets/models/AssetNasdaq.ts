import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";
import AssetDetailsList from "./AssetDetailsList";
import AssetsService from "../services/AssetsService";
import AssetModel from "./AssetModel";

const prisma = new PrismaClient();

const AssetNasdaq = () => {

  async function getAssetByTickerFromDb(ticker: string) {
    return await AssetModel().getAssetByTickerFromDb(ticker);
  }

  async function getDividendHistoryData(ticker: string, type: number) {
    return await AssetModel().getDividendHistoryData(ticker, type)
  }

  async function getAssetApiData(ticker: string, type = 2) {
    const searchSymbol = await AssetsService().searchSymbol(ticker, type);
    const assetData = searchSymbol?.data;

    const historicalDividendsSearch =
      await getDividendHistoryData(ticker, type);

    const historicalData = historicalDividendsSearch?.data;

    const { chart } = historicalData;

    const lastPrice = assetData?.primaryData?.lastSalePrice;

    const apiObjData = {
      symbolData: assetData,
      lastPrice,
      historicalDividends: chart,
    }

    return apiObjData;
  }

  async function insertAsset(insertObj: any) {
    const { ticker, type = 2 } = insertObj;

    const tickerCode = ticker.replace(/(^[\\/-]+)|([\\/-]+$)/g, '');

    let assetAlreadyInDb = await getAssetByTickerFromDb(tickerCode);
    if (assetAlreadyInDb) throw new CommonError(`${tickerCode} already exists`);

    const assetApiData = await getAssetApiData(tickerCode, type);

    const { symbolData, lastPrice, historicalDividends } = assetApiData;

    try {

      const insertAssetItem = await prisma.assets.create({
        data: { name: tickerCode, type, }
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

      return {
        id: assetId,
        name: ticker,
        type,
        AssetDetailList: [assetDetailsList]
      };

    } catch (error) {
      // console.log(error);
      throw new CommonError(`Error creating Asset Item`);
    } finally {
      await prisma.$disconnect();
    }

  }

  async function updateAsset(updateObj: any) {
    const { ticker, type = 2 } = updateObj;

    let assetAlreadyInDb = await getAssetByTickerFromDb(ticker);

    if (!assetAlreadyInDb) throw new CommonError(`${ticker} don't exists in details list`);

    const assetId = assetAlreadyInDb.id;

    const { symbolData, lastPrice, historicalDividends } = await getAssetApiData(ticker, type);

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

export default AssetNasdaq;