const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedUsers = require("./insert/users-seeder.ts");
const seedAccountTypes = require("./insert/accountTypes-seeder.ts");

const seedAssetTypes = require("./insert/assetTypes-seeder.ts");


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

    const accountTypesExist = await doesTableExist('account_types');

    // Asset types
    await seedAssetTypes();

    if (!accountTypesExist) {
      console.log('\nRun the command again to insert users...\n');
      return;
    }

    await seedUsers();

    console.log('\nSeeding completed successfully.\n\n');

  } catch (error) {
    console.error('\n\n Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();