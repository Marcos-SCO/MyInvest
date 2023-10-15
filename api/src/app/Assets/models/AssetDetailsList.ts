import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AssetDetailsList = () => {

  async function getAssetDetailsFromDb(assetId: number) {
    const assetInDb = await prisma.assetDetailsList.findFirst({
      where: { assetId: assetId }
    });

    if (!assetInDb) return false;

    return assetInDb;
  }

  async function createAssetDetails(dataObj: any) {
    // const { assetId, symbols, currentDividend, historicalDividends } = dataObj;

    try {
      const assetDetailsList = await prisma.assetDetailsList.create({
        data: { ...dataObj }
      });

      return assetDetailsList;
    } catch (error) {
      console.log(`Error creating Asset details: `, error);
      throw new CommonError(`Error creating Asset details`);
    } finally {
      await prisma.$disconnect();
    }
  }

  async function updateAssetDetails(assetId: number, dataObj: any) {
    // const { symbols, currentDividend, historicalDividends } = dataObj;

    try {
      const updateDetails = await prisma.assetDetailsList.update({
        where: { assetId },
        data: { ...dataObj },
      });

      return updateDetails;
    } catch (error) {
      console.log(`Error updating Asset details: `, error);
      throw new CommonError(`Error updating Asset details`);
    } finally {
      await prisma.$disconnect();
    }
  }

  return { getAssetDetailsFromDb, createAssetDetails, updateAssetDetails }

};

export default AssetDetailsList;