const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const dropUserTypes = require("./drop/users/drop-accountTypes.ts");
const dropUsers = require("./drop/users/drop-users-seeder.ts");

const dropAssetTypes = require("./drop/drop-assetTypes.ts");

async function drops() {
  try {
    
    await dropUsers();
    // await dropUserTypes();
    
    
    await dropAssetTypes();
    
    console.log('\n\n Drop completed successfully.');
  } catch (error) {
    console.error('\n\n\ Dropping error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

drops();