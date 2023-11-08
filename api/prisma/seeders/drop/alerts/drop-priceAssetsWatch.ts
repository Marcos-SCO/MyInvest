const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function dropPriceAssetsWatch() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE price_assets_watch AUTO_INCREMENT = 1;`;

      // console.log('UserAssets: auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting price_assets_watch auto-increment counter:', error);
    }
  }

  async function dropPriceAssetsWatchTable() {
    try {
      await prisma.priceAssetsWatch.deleteMany();

      console.log('PriceAssetWatch table data deleted\n');
    } catch (error) {
      console.error('Error deleting data from PriceAssetWatch table:', error);
    }
  }

  async function main() {
    await resetAutoIncrementCounter();

    await dropPriceAssetsWatchTable();
    
    await prisma.$disconnect();
  }

  main()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      console.log('PriceAssetsWatch dropped\n');
    });
}

module.exports = dropPriceAssetsWatch;
