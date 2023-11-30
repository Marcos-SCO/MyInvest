import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";
import AssetDetailsList from "./AssetDetailsList";
import AssetsService from "../services/AssetsService";
import { cleanCurrency } from "@/app/helpers/Currency";

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

  async function getAllAssetsByTickerFromDb(tickers: any, options: any) {
    const includeDetails = options?.includeDetails ?? false;
    const historicalData = options?.historicalData ?? false;

    const queryObj: any = { where: { name: { in: tickers }, }, include: {} }

    if (includeDetails) {
      queryObj.include = {
        AssetDetailList: {
          select: { assetId: true, symbols: true, assetIcon: true, currentPrice: true, historicalData: historicalData }
        }
      }
    }

    const assetInDb = await prisma.assets.findMany(queryObj);

    if (!assetInDb) return false;

    return assetInDb;
  }

  async function getAssetWithDetailInfo(ticker: string) {
    const assetQuery = await prisma.assets.findFirst({
      where: { name: ticker },
      include: {
        AssetDetailList: true,
      }
    });

    if (!assetQuery) return false;

    return assetQuery;
  }

  async function getAllAssetsWithDetailInfo() {
    const assetQuery = await prisma.assets.findMany({
      include: {
        AssetDetailList: true,
      }
    });

    if (!assetQuery) return false;

    return assetQuery;
  }

  async function getAllAssetsByPagination(args: any) {

    const { page = 1, numberOfItens = 10, getDetailedList = false, orderBy = false } = args;

    const totalAssetsCount = await prisma.assets.count();

    const totalPages = Math.ceil(totalAssetsCount / numberOfItens);

    // Calculate the number of records to skip
    const skip = (page - 1) * numberOfItens;

    const queryObj: any = {
      skip,
      take: +numberOfItens,
      include: {
        AssetDetailList: getDetailedList,
      },
    }

    if (orderBy) queryObj['orderBy'] = orderBy;

    const assetResults =
      await prisma.assets.findMany(queryObj);

    await prisma.$disconnect();

    return {
      totalPages,
      totalAssetsCount,
      assetResults
    }
  }

  async function getHistoryByDate(ticker: string, type: number) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const initialYear = currentYear - 5;
    const finalYear = currentYear + 1;

    // return await AssetsService().getHistory(ticker, `${initialYear}-01-01`, `${finalYear}-01-01`, type);
  }

  async function getHistoryData(ticker: string, type: number) {

    try {
      const historyData = await AssetsService().getHistoryFromBrapi(ticker);
      return historyData;

    } catch {
      return false;
    }
  }

  async function getAssetApiData(ticker: string, type = 1) {
    const assetData = await AssetsService().searchSymbol(ticker, type);

    const historicalData: any = await getHistoryData(ticker, type);

    const assetDataObj = assetData?.[0];

    const { price = '' } = assetDataObj;

    const historicalDataResults =
      historicalData ? (historicalData)?.results[0] : [];

    const assetIcon =
      historicalDataResults?.logourl ?? 'https://brapi.dev/favicon.svg';

    const apiObjData = {
      symbolData: assetDataObj,
      assetIcon,
      lastPrice: price,
      historicalData: historicalData ?? [],
    }

    return apiObjData;
  }

  async function insertNotInsertedTickers(tickers: any, tickerAssetType: any) {

    if (!tickers) return;

    const tickerItens = Array.isArray(tickers)
      ? tickers : JSON.parse(tickers);

    if (!tickerItens) return;

    tickerItens.map(async (ticker: any) => {
      const tickerCode =
        ticker.replace(/(^[\\/-]+)|([\\/-]+$)/g, '');

      let assetAlreadyInDb =
        await getAssetByTickerFromDb(tickerCode);

      if (assetAlreadyInDb) return;

      await insertAsset({
        ticker, type: tickerAssetType
      });

    });
  }

  async function insertAsset(insertObj: any) {
    const { ticker, type = 1 } = insertObj;

    const tickerCode = ticker.replace(/(^[\\/-]+)|([\\/-]+$)/g, '');

    let assetAlreadyInDb = await getAssetByTickerFromDb(tickerCode);
    if (assetAlreadyInDb) throw new CommonError(`${tickerCode} already exists`);

    const { symbolData, assetIcon, lastPrice, historicalData }
      = await AssetModel().getAssetApiData(tickerCode, type);

    const historicalDataValue = historicalData ? historicalData : [];

    try {

      const insertAssetItem = await prisma.assets.create({
        data: { name: tickerCode, type, }
      });

      const assetId = insertAssetItem.id;

      const cleanCurrentPrice = cleanCurrency(lastPrice);

      const assetDetailsObj: any = {
        assetId,
        assetIcon,
        currentPrice: cleanCurrentPrice,
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
      console.log('AssetModel: ', error);
      throw new CommonError(`Error creating Asset Item`);
    } finally {
      await prisma.$disconnect();
    }

  }

  async function updateAsset(updateObj: any) {
    const { ticker, type = 1, passedAssetFromDb = false } = updateObj;

    let assetAlreadyInDb = !passedAssetFromDb
      ? await getAssetByTickerFromDb(ticker) : passedAssetFromDb;

    if (!assetAlreadyInDb) throw new CommonError(`${ticker} don't exists in details list`);

    const assetId = assetAlreadyInDb.id;

    const { symbolData, assetIcon, lastPrice, historicalData } = await getAssetApiData(ticker, type);

    const historicalDataValue = historicalData ? historicalData : [];

    // const isHistoryDataError = historicalData ? historicalData?.error : false;
    // if (isHistoryDataError) throw new CommonError(`Brapi error: ${historicalData?.message}`);

    const cleanCurrentPrice = cleanCurrency(lastPrice);

    const assetDetailsObj: any = {
      assetId,
      assetIcon,
      currentPrice: cleanCurrentPrice,
      symbols: JSON.stringify(symbolData),
      historicalData: JSON.stringify(historicalDataValue),
    }

    try {

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

  async function deleteAsset(deleteObj: any) {
    const { ticker } = deleteObj;

    let assetAlreadyInDb = await getAssetByTickerFromDb(ticker);
    if (!assetAlreadyInDb) throw new CommonError(`${ticker} don't exists`);

    try {
      const deletedAsset = await prisma.assets.delete({
        where: { name: ticker }
      });

      return deletedAsset;
    } catch (error) {
      console.log(`Error deleting asset ${ticker} `, error);
      throw new CommonError(`Error deleting asset ${ticker}`);
    } finally {
      await prisma.$disconnect();
    }

  }

  return { insertAsset, updateAsset, deleteAsset, insertNotInsertedTickers, getAssetByTickerFromDb, getAllAssetsByTickerFromDb, getAssetWithDetailInfo, getAllAssetsWithDetailInfo, getAllAssetsByPagination, getAssetById, getAssetApiData, getHistoryData };
}

export default AssetModel;