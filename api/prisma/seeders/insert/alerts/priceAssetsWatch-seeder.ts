const { PrismaClient } = require('@prisma/client');

import PriceAssetsWatchModel from "../../../../src/app/Assets/models/PriceAssetsWatchModel";

const prisma = new PrismaClient();

async function insertPriceAssetsWatch() {

  async function seed() {
    try {
      const users = await prisma.users.findMany();
      const assets = await prisma.assets.findMany();

      // Check if there are users and assets available.
      if (users.length === 0 || assets.length === 0) {
        console.error('No users or assets available for insertion.');
        return;
      }

      // Define the number of assets to insert for each user.
      const assetsPerUser = 6;

      const expectedPricesArray = ["55", "120", "10", "30.50", "11.50", "120.20"];
      const alertTypesArray = [1, 2];

      for (const user of users) {

        for (let i = 0; i < assetsPerUser; i++) {
          // Randomly select an asset for the user.
          const randomAsset = assets[Math.floor(Math.random() * assets.length)];

          const expectedPrice =
            expectedPricesArray[Math.floor(Math.random() * expectedPricesArray.length)];

          const priceAlertTypeId = alertTypesArray[Math.floor(Math.random() * alertTypesArray.length)];

          const userId = user?.id;
          const assetId = randomAsset?.id;

          const userScheduleSamePriceForAsset =
            await PriceAssetsWatchModel().userScheduleSamePriceAlert(userId, assetId, expectedPrice);

          if (userScheduleSamePriceForAsset) { continue; }

          // Insert the user-asset relationship.
          await prisma.priceAssetsWatch.create({
            data: {
              userId,
              assetId,
              priceAlertTypeId,
              expectedPrice,
            },
          });

        }
      }

      console.log('PriceAssetsWatch inserted successfully.');
    } catch (error) {
      console.error('Error inserting PriceAssetsWatch itens: ', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  seed()
    .catch(e => {
      console.error(e);
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = insertPriceAssetsWatch;
