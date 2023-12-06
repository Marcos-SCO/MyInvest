import AuthError from '@/app/Auth/exceptions/AuthError';
import CommonError from '@/app/Auth/exceptions/CommonError';
import UserModel from '@/app/Users/models/UserModel';
import { PrismaClient } from '@prisma/client';
import AssetModel from './AssetModel';
import AssetDetailsList from './AssetDetailsList';

import { cleanCurrency } from '@app/helpers/Currency';

const prisma = new PrismaClient();

const PriceAssetsWatchModel = () => {

  async function getUserById(id: number) {
    return await UserModel().getUserById(id);
  }

  async function getAssetById(id: number) {
    return await AssetModel().getAssetById(id);
  }

  async function assetReachedExpectedPrice(dataObj: any) {

    const { priceAlertId, assetId, userId, expectedPrice, priceAlertTypeId, ative = true } = dataObj;

    const assetDetailsQuery = await prisma.assetDetailsList.findUnique({
      where: { assetId },
      select: {
        currentPrice: true,
      }
    });

    if (!assetDetailsQuery) return false;

    const assetCurrentPrice = assetDetailsQuery?.currentPrice;

    const numCurrentPrice = +assetCurrentPrice;
    const numExpectedPrice = +expectedPrice;

    let currentPriceReached;

    const isLessThanType = priceAlertTypeId == 1;
    const isGreaterThanType = priceAlertTypeId == 2;

    const priceTypeMessage =
      isLessThanType ? 'Menor ou igual' : 'Maior ou igual';

    if (isLessThanType) {
      currentPriceReached = numCurrentPrice <= numExpectedPrice;
    }

    if (isGreaterThanType) {
      currentPriceReached = numCurrentPrice >= numExpectedPrice;
    }

    if (!currentPriceReached) {
      console.log('Current price reached: ', currentPriceReached)
      return false;
    }

    const userEmailQuery = await prisma.userEmails.findFirst({
      where: { userId },
      select: {
        email: true,
      }
    });

    if (!userEmailQuery) return false;
    const userEmail = userEmailQuery?.email;

    return {
      currentPriceReached: currentPriceReached,
      userEmail,
      expectedPrice,
      priceTypeMessage,
      currentPrice: +assetCurrentPrice
    };

  }

  async function getPriceAlertById(id: number) {
    const priceAlert = await prisma.priceAssetsWatch.findUnique({
      where: { id }
    });

    if (!priceAlert) {
      console.error(`Error retrieving price alert: ${id}`);
      return false;
    }

    return priceAlert;
  }

  async function userScheduleSamePriceAlert(userId: number, assetId: number, expectedPrice: any, priceAlertTypeId = 1, active = true) {

    const userAlreadyScheduleAlert =
      await prisma.priceAssetsWatch.findFirst({
        where: { userId, assetId, expectedPrice, priceAlertTypeId, active }
      });

    if (!userAlreadyScheduleAlert) return false;

    await prisma.$disconnect();

    return userAlreadyScheduleAlert;
  }

  async function getPaginatedAlertsWithDetails(alertPaginatedResults: any) {
    const assetsWithDetails = [];

    let paginatedAssetItem: any = {};

    for (paginatedAssetItem of alertPaginatedResults) {

      const assetId = paginatedAssetItem?.assetId;

      const assetDetailsResults: any = await prisma.assets.findUnique({
        where: { id: assetId },
        include: {
          AssetDetailList: {
            select: {
              currentPrice: true,
              assetIcon: true,
            }
          },
        },
      });

      const { id, name, type, AssetDetailList } = assetDetailsResults;

      const detailsList = { id, name, type };

      const assetDetailList = AssetDetailList?.[0];

      const assetDetails: any = { ...detailsList, ...assetDetailList };

      assetsWithDetails.push({ ...paginatedAssetItem, ...paginatedAssetItem.assets, assetDetails });
    }

    return assetsWithDetails;
  }

  async function getAllByPagination(args: any) {
    const { page = 1, numberOfItens = 10, getDetailedList = false, includeSymbols = false, orderBy = false } = args;

    const userId = args?.userId;
    const searchByStatus = args?.searchByStatus ?? false;
    const active = args?.active;

    const countObj: any = {};

    if (userId) countObj.where = { ...countObj.where, userId: userId }

    if (searchByStatus) countObj.where = { ...countObj.where, active: active }

    const totalAlertsCount = await prisma.priceAssetsWatch.count(countObj);

    const totalPages = Math.ceil(totalAlertsCount / numberOfItens);

    const skip = (page - 1) * numberOfItens;
    // Calculate the number of records to skip

    const queryObj: any = {
      skip,
      take: +numberOfItens,
      include: {
        priceAlertTypes: true,
      }
    }

    if (includeSymbols) {
      const symbolsParams: any = { assets: { select: { symbols: true } } };

      queryObj.include = { ...queryObj.include, ...symbolsParams };
    }

    if (userId) {
      queryObj.where = { ...queryObj.where, userId: userId };
    }

    if (searchByStatus) {
      queryObj.where = { ...queryObj.where, active: active };
    }

    if (orderBy) queryObj['orderBy'] = orderBy;

    const priceAlertResults =
      await prisma.priceAssetsWatch.findMany(queryObj);

    const priceAlertResultsData = getDetailedList
      ? await getPaginatedAlertsWithDetails(priceAlertResults)
      : priceAlertResults;

    await prisma.$disconnect();

    return {
      totalPages,
      totalAlertsCount,
      priceAlertResults: priceAlertResultsData,
    };
  }

  async function insertPriceAlert(insertOjb: any) {
    let { userId, assetId, expectedPrice, priceAlertTypeId = 1 } = insertOjb;

    await getUserById(userId);
    await getAssetById(assetId);

    const cleanExpectedPrice = cleanCurrency(expectedPrice);

    const alreadyScheduleSamePrice =
      await userScheduleSamePriceAlert(userId, assetId, cleanExpectedPrice, priceAlertTypeId);

    if (alreadyScheduleSamePrice) {
      throw new CommonError(`User: ${userId} already has a schedule with same price of ${cleanExpectedPrice} for Asset: ${assetId}`);
    }

    const newInsertObject: any =
      { ...insertOjb, expectedPrice: cleanExpectedPrice }

    try {

      const insertPriceAlert = await prisma.priceAssetsWatch.create({
        data: { ...newInsertObject }
      });

      return insertPriceAlert;

    } catch (error) {

      console.log(`Error creating price alert: `, error);
      throw new CommonError(`Error creating price alert`);

    } finally {

      await prisma.$disconnect();
    }

  }

  async function updatePriceAlert(insertOjb: any) {
    const { alertId, active = true } = insertOjb;

    const foundPriceAlert = await getPriceAlertById(alertId);

    if (!foundPriceAlert) throw new CommonError(`Alert id: ${alertId} was not found`);

    try {

      const updatedAlert = await prisma.priceAssetsWatch.update({
        where: { id: alertId },
        data: { active }
      })

      return updatedAlert;

    } catch (error) {

      console.error(`Error updating price alert: `, error);
      throw new CommonError(`Error updating price alert`);

    } finally {
      await prisma.$disconnect();
    }

  }

  async function deletePriceAlert(insertOjb: any) {
    const { alertId, softDelete = false, active = false } = insertOjb;

    const foundPriceAlert = await getPriceAlertById(alertId);

    if (!foundPriceAlert) throw new CommonError(`Alert id: ${alertId} was not found`);

    let deletedPriceAlert;

    try {

      if (softDelete) {
        deletedPriceAlert = await prisma.priceAssetsWatch.update({
          where: { id: alertId },
          data: { active }
        })
      }

      if (!softDelete) {
        deletedPriceAlert = await prisma.priceAssetsWatch.delete({ where: { id: alertId } });
      }

      return deletedPriceAlert;

    } catch (error) {

      console.log(`Error deleting price alert: `, error);
      throw new CommonError(`Error deleting price alert`);

    } finally {
      await prisma.$disconnect();
    }

  }

  return { insertPriceAlert, userScheduleSamePriceAlert, updatePriceAlert, deletePriceAlert, getAllByPagination, assetReachedExpectedPrice }
}

export default PriceAssetsWatchModel;