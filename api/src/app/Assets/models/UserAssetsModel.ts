import AuthError from '@/app/Auth/exceptions/AuthError';
import CommonError from '@/app/Auth/exceptions/CommonError';
import UserModel from '@/app/Users/models/UserModel';
import { PrismaClient } from '@prisma/client';
import AssetModel from './AssetModel';
import AssetDetailsList from './AssetDetailsList';

const prisma = new PrismaClient();

const UserAssetsModel = () => {

  async function getUserById(id: number) {
    return await UserModel().getUserById(id);
  }

  async function getAssetById(id: number) {
    return await AssetModel().getAssetById(id);
  }

  async function userAssetsValidation(validationObj: any) {
    const { userId, assetId } = validationObj;
    if (!userId) throw new CommonError(`No user id was passed`);

    const userExist = await getUserById(userId);

    const assetExist = await getAssetById(assetId);
    if (!assetExist) throw new CommonError(`Asset id:${assetId} don't exists in db`);

  }

  async function getUserAsset(userId: number, assetId: number) {
    const userAsset = await prisma.userAssets.findFirst({
      where: { userId, assetId }
    });

    if (!userAsset) return false;

    await prisma.$disconnect();

    return userAsset;
  }

  async function getPaginatedAssetWithDetails(assetsPaginatedResults: any) {
    const assetsWithDetails = [];

    let paginatedAssetItem: any = {};

    for (paginatedAssetItem of assetsPaginatedResults) {

      const assetDetails: any = await AssetDetailsList()
        .getAssetDetailsFromDb(paginatedAssetItem.assetId);

      // Exclude itens and return rest
      const { id, assetId, historicalData, ...restAssetDetails } = assetDetails;

      assetsWithDetails.push({ ...paginatedAssetItem.assets, assetDetails: restAssetDetails });
    }

    return assetsWithDetails;
  }

  async function getAllByPagination(userId: number, args: any) {
    const userExist = await getUserById(userId);
    if (!userExist) return;

    const { page = 1, numberOfItens = 10, getDetailedList = true, orderBy = false } = args;

    const totalAssetsCount = await prisma.userAssets.count({
      where: { userId }
    });

    const totalPages = Math.ceil(totalAssetsCount / numberOfItens);

    const skip = (page - 1) * numberOfItens;
    // Calculate the number of records to skip

    const queryObj: any = {
      where: { userId },
      skip,
      take: +numberOfItens,
      include: {
        assets: true
      },
    }

    if (orderBy) queryObj['orderBy'] = orderBy;

    const userAssetsResults =
      await prisma.userAssets.findMany(queryObj);

    const assetsQueryResults = getDetailedList
      ? await getPaginatedAssetWithDetails(userAssetsResults)
      : userAssetsResults;

    await prisma.$disconnect();

    return {
      totalPages,
      totalAssetsCount,
      assetsQueryResults
    };
  }


  async function insertUserAsset(insertOjb: any) {
    const { userId, assetId } = insertOjb;

    await userAssetsValidation(insertOjb);

    const userHaveAsset = await getUserAsset(userId, assetId);
    if (userHaveAsset) throw new CommonError(`User id: ${userId} already have Asset id: ${assetId}`);

    try {

      const insertUserAsset = await prisma.userAssets.create({
        data: { ...insertOjb }
      });

      return insertUserAsset;
    } catch (error) {
      console.log(`Error creating user assets: `, error);
      throw new CommonError(`Error creating user assets`);
    } finally {
      await prisma.$disconnect();
    }

  }

  async function deleteUserAsset(insertOjb: any) {
    const { userId, assetId } = insertOjb;

    await userAssetsValidation(insertOjb);

    const userHaveAsset = await getUserAsset(userId, assetId);
    if (!userHaveAsset) throw new CommonError(`User id: ${userId} don't have Asset id: ${assetId}`);

    try {
      const deletedUserAsset = await prisma.userAssets.deleteMany({
        where: { userId, assetId }
      });

      return deletedUserAsset;
    } catch (error) {
      console.log(`Error deleting user assets: `, error);
      throw new CommonError(`Error deleting User assets`);
    } finally {
      await prisma.$disconnect();
    }

  }

  return { insertUserAsset, deleteUserAsset, getUserAsset, getAllByPagination }
}

export default UserAssetsModel;