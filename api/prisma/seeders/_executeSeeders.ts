const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const seedUsers = require("./insert/users/users-seeder.ts");
const seedAccountTypes = require("./insert/users/accountTypes-seeder.ts");

const seedAssetTypes = require("./insert/assets/assetTypes-seeder.ts");

const seedAssets = require("./insert/assets/assetItens-seeder.ts");


async function doesTableExist(tableName) {
  try {
    const data = await prisma.$queryRawUnsafe(`SELECT * FROM ${tableName} LIMIT 1`);
    // console.log(data);
    return data.length > 0;
  } catch (error) {
    throw error;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function seed() {
  try {
    await seedAccountTypes();
    // await seedUsers();

    /* const accountTypesExist = await doesTableExist('account_types');
   
    if (!accountTypesExist) {
      console.log('\nRun the command again to insert users...\n');
      return;
    } */

    // Asset types
    await seedAssetTypes();
    await seedAssets();



    console.log('\nSeeding completed successfully.\n\n');

  } catch (error) {
    console.error('\n\n Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();