const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const dropTypes = require("./drop/drop-accountTypes.ts");
const dropUsers = require("./drop/drop-users-seeder.ts");

async function drops() {
  try {
    await dropUsers();

    await dropTypes();

    console.log('\n\n Drop completed successfully.');
  } catch (error) {
    console.error('\n\n\ Dropping error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

drops();