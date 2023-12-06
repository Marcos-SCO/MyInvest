import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";

import AssetModel from "./AssetModel";

const prisma = new PrismaClient();

const TopAssetListModel = () => {

  async function getTopAssetsData(props: any) {
    const { assetListTypeId } = props;

    if (!assetListTypeId) throw new CommonError('assetListTypeId is missing');

    try {
      const assetsData: any =
        (await prisma.topAssetListItens.findMany({ where: { assetListTypeId } }))?.[0];

      if (!assetsData) throw new CommonError('No assets data found');

      const highItens = assetsData?.highItens
        ? JSON.parse(assetsData?.highItens) : [];

      const lowItens = assetsData?.lowItens
        ? JSON.parse(assetsData?.lowItens) : [];

      // const tickers = [...highItens, ...lowItens];

      // const notInsertedTickers = await AssetModel().insertNotInsertedTickers(tickers, assetListTypeId);

      const includeOptions = { includeDetails: true };

      const highItensData = await AssetModel().getAllAssetsByTickerFromDb(highItens, includeOptions);

      const lowItensData = await AssetModel().getAllAssetsByTickerFromDb(lowItens, includeOptions);

      return {
        topAssetData: assetsData,
        highItensData,
        lowItensData
      }

    } catch (error) {
      console.log('TopAssetListModel ', error);
      throw new CommonError('Error getting top assets data');
    } finally {
      await prisma.$disconnect();
    }

  }

  async function insertTopItens(insertObj: any) {
    const { tickerAssetType = 1, tickers, assetListTypeId, trendingSection = 'high' } = insertObj;

    const isHighItens = trendingSection == 'high';
    const isLowItens = trendingSection == 'low';

    const notInsertedTickers =
      await AssetModel().insertNotInsertedTickers(tickers, tickerAssetType);

    const dataToInsert: any = { assetListTypeId };

    if (isHighItens) dataToInsert.highItens = tickers;
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

  return { insertTopItens, getTopAssetsData };
}

export default TopAssetListModel;