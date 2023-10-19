const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function dropUserAssets() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE user_assets AUTO_INCREMENT = 1;`;

      // console.log('UserAssets: auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting user_assets auto-increment counter:', error);
    }
  }

  async function dropUserAssetsTable() {
    try {
      await prisma.userAssets.deleteMany();

      console.log('UserAssets table data deleted\n');
    } catch (error) {
      console.error('Error deleting data from UserAssets table:', error);
    }
  }

  async function main() {
    await resetAutoIncrementCounter();

    await dropUserAssetsTable();
    
    await prisma.$disconnect();
  }

  main()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      console.log('UserAssets dropped\n');
    });
}

module.exports = dropUserAssets;
