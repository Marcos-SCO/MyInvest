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

  async function userScheduleSamePriceAlert(userId: number, assetId: number, expectedPrice: any) {

    const userAlreadyScheduleAlert =
      await prisma.priceAssetsWatch.findFirst({
        where: { userId, assetId, expectedPrice }
      });

    if (!userAlreadyScheduleAlert) return false;

    await prisma.$disconnect();

    return userAlreadyScheduleAlert;
  }

  async function getAllByPagination(args: any) {
    const { page = 1, numberOfItens = 10, getDetailedList = true, orderBy = false } = args;

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

    await prisma.$disconnect();

    return {
      totalPages,
      totalAlertsCount,
      priceAlertResults,
    };
  }

  async function insertPriceAlert(insertOjb: any) {
    let { userId, assetId, expectedPrice } = insertOjb;

    await getUserById(userId);
    await getAssetById(assetId);

    const cleanExpectedPrice = cleanCurrency(expectedPrice);

    const alreadyScheduleSamePrice =
      await userScheduleSamePriceAlert(userId, assetId, cleanExpectedPrice);

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

  return { insertPriceAlert, deletePriceAlert, getAllByPagination }
}

export default PriceAssetsWatchModel;