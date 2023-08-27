const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function dropTypes() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE account_types AUTO_INCREMENT = 1;`;

      console.log('account_types : auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting account_types auto-increment counter:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  resetAutoIncrementCounter();

  async function dropSeeders() {
    // Delete all data from Users and related tables
    await prisma.accountTypes.deleteMany();

    console.log('Account Type Seeders dropped\n\n');

    resetAutoIncrementCounter();
  }

  dropSeeders()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = dropTypes;