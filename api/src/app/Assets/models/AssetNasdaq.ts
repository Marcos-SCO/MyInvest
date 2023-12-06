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

  async function getHistoryData(ticker: string, type: number) {
    return await AssetModel().getHistoryData(ticker, type)
  }

  async function getAssetApiData(ticker: string, type = 2) {
    const searchSymbol = await AssetsService().searchSymbol(ticker, type);
    const assetData = searchSymbol?.data;

    // const historicalData = historicalDataSearch?.data;
    // const { chart } = historicalData;

    const historicalDataSearch = await getHistoryData(ticker, type);

    const historicalData = historicalDataSearch;

    const historicalDataResults =
      historicalData ? (historicalData)?.results[0] : [];

    const assetIcon =
      historicalDataResults?.logourl ?? 'https://brapi.dev/favicon.svg';

    const lastPrice = assetData?.primaryData?.lastSalePrice;

    const apiObjData = {
      symbolData: assetData,
      assetIcon,
      lastPrice,
      historicalData: historicalData,
    }

    return apiObjData;
  }

  async function insertAsset(insertObj: any) {
    const { ticker, type = 2 } = insertObj;

    const tickerCode = ticker.replace(/(^[\\/-]+)|([\\/-]+$)/g, '');

    let assetAlreadyInDb = await getAssetByTickerFromDb(tickerCode);
    if (assetAlreadyInDb) throw new CommonError(`${tickerCode} already exists`);

    const assetApiData = await getAssetApiData(tickerCode, type);

    const { symbolData, assetIcon, lastPrice, historicalData } = assetApiData;

    const historicalDataValue = historicalData ? historicalData : [];

    try {

      if (!symbolData) {
        throw new CommonError('Symbol not exists');
      }

      const insertAssetItem = await prisma.assets.create({
        data: { name: tickerCode, type, }
      });

      const assetId = insertAssetItem.id;

      const assetDetailsObj = {
        assetId,
        assetIcon,
        currentPrice: JSON.stringify(lastPrice),
        symbols: JSON.stringify(symbolData),
        historicalData: JSON.stringify(historicalDataValue),
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
      throw new CommonError(`Error creating Asset Item: ${error}`);
    } finally {
      await prisma.$disconnect();
    }

  }

  async function updateAsset(updateObj: any) {
    const { ticker, type = 2, passedAssetFromDb = false } = updateObj;

    let assetAlreadyInDb = !passedAssetFromDb
      ? await getAssetByTickerFromDb(ticker) : passedAssetFromDb;

    if (!assetAlreadyInDb) throw new CommonError(`${ticker} don't exists in details list`);

    const assetId = assetAlreadyInDb.id;

    const { symbolData, assetIcon, lastPrice, historicalData } = await getAssetApiData(ticker, type);

    const historicalDataValue = historicalData ? historicalData : [];

    // const isHistoryDataError = historicalData?.error;
    // if (isHistoryDataError) throw new CommonError(`Brapi error: ${historicalData?.message}`);

    try {
      const assetDetailsObj = {
        assetId,
        assetIcon,
        currentPrice: JSON.stringify(lastPrice),
        symbols: JSON.stringify(symbolData),
        historicalData: JSON.stringify(historicalDataValue),
      }

      const assetDetailsList = await AssetDetailsList()
        .updateAssetDetails(assetId, assetDetailsObj);

      return assetDetailsList;

    } catch (error) {
      console.log('AssetNasdaq: ', error);
      throw new CommonError(`Error updating Asset Item`);
    } finally {
      await prisma.$disconnect();
    }

  }

  return { insertAsset, updateAsset, getAssetByTickerFromDb, getAssetApiData };
}

export default AssetNasdaq;