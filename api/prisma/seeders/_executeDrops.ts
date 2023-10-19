const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const dropUserTypes = require("./drop/users/drop-accountTypes.ts");
const dropUsers = require("./drop/users/drop-users-seeder.ts");

const dropAssetTypes = require("./drop/assets/drop-assetTypes.ts");

// const dropAssets = require("./drop/assets/drop-assetItens.ts");

async function drops() {
  try {

    await dropUsers();
    // await dropUserTypes();

    await dropAssetTypes();
    // await dropAssets();

    console.log('\n\nDrop completed successfully.\n');
  } catch (error) {
    console.error('\n\n\ Dropping error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

drops();