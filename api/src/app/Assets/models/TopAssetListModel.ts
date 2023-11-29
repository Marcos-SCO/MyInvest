import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";

import AssetModel from "./AssetModel";

const prisma = new PrismaClient();

const TopAssetListModel = () => {

  async function getAssetByTickerFromDb(ticker: string) {
    return await AssetModel().getAssetByTickerFromDb(ticker);
  }

  async function insertNotInsertedTickers(tickers: any, tickerAssetType: any) {

    if (!tickers) return;

    const tickerItens = JSON.parse(tickers);
    // console.log(tickerItens);

    if (!tickerItens) return;

    tickerItens.map(async (ticker: any) => {
      const tickerCode = ticker.replace(/(^[\\/-]+)|([\\/-]+$)/g, '');

      let assetAlreadyInDb = await getAssetByTickerFromDb(tickerCode);
      if (assetAlreadyInDb) return;

      await AssetModel().insertAsset({
        ticker, type: tickerAssetType
      });

    });
  }

  async function insertTopItens(insertObj: any) {
    const { tickerAssetType = 1, tickers, assetListTypeId, trendingSection = 'high' } = insertObj;

    const isHighItens = trendingSection == 'high';
    const isLowItens = trendingSection == 'low';

    const notInsertedTickers =
      await insertNotInsertedTickers(tickers, tickerAssetType);

    const dataToInsert: any = { assetListTypeId };

    if (isHighItens) dataToInsert.hightItens = tickers;
    if (isLowItens) dataToInsert.lowItens = tickers;

    const listIsInDb = await prisma.topAssetListItens.findFirst({
      where: { assetListTypeId }
    });

    try {

      if (!listIsInDb) {

        const insertTopItens = await prisma.topAssetListItens.create({
          data: dataToInsert
        });

        const assetDetailsObj: any = {
          success: true,
          data: insertTopItens
        }

        return assetDetailsObj;
      }

      if (listIsInDb) {

        const updateTopItens = await prisma.topAssetListItens.update({
          where: { assetListTypeId },
          data: dataToInsert
        });

        const assetDetailsObj: any = {
          success: true,
          data: updateTopItens
        }

        return assetDetailsObj;
      }

    } catch (error) {

      console.log('Error creating TopAssetList: ', error);
      throw new CommonError(`Error creating TopAssetList Item`);

    } finally {
      await prisma.$disconnect();
    }

  }

  return { insertTopItens, getAssetByTickerFromDb, };
}

export default TopAssetListModel;