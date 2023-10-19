const { PrismaClient } = require('@prisma/client');

import userAssetModel from "../../../../src/app/Assets/models/UserAssetsModel";

const prisma = new PrismaClient();

async function insertUserAssets() {

  async function seed() {
    try {
      // Retrieve a list of users and assets (you should have your own data or use Prisma queries to fetch them).
      const users = await prisma.users.findMany();
      const assets = await prisma.assets.findMany();

      // Check if there are users and assets available.
      if (users.length === 0 || assets.length === 0) {
        console.error('No users or assets available for insertion.');
        return;
      }

      // Define the number of assets to insert for each user.
      const assetsPerUser = 6;

      // Loop through users and assets to create user-assets relationships.
      for (const user of users) {

        for (let i = 0; i < assetsPerUser; i++) {
          // Randomly select an asset for the user.
          const randomAsset = assets[Math.floor(Math.random() * assets.length)];

          const userId = user?.id;
          const assetId = randomAsset?.id;

          const userAlreadyHaveAsset =
            await userAssetModel().getUserAsset(userId, assetId);

          if (userAlreadyHaveAsset) { continue; }

          // Insert the user-asset relationship.
          await prisma.userAssets.create({
            data: {
              userId,
              assetId
            },
          });
        }
      }

      console.log('User assets inserted successfully.');
    } catch (error) {
      console.error('Error inserting user assets:', error);
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

module.exports = insertUserAssets;
