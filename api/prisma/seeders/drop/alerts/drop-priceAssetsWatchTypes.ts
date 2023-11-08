const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const dropPriceAssetsWatch = require("./drop-priceAssetsWatch.ts");

function dropPriceAssetsWatchTypes() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE price_alert_types AUTO_INCREMENT = 1;`;

      // console.log('asset_types : auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting price_alert_types auto-increment counter:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  resetAutoIncrementCounter();

  async function dropSeeders() {
    // Delete all data from Asset types
    await prisma.priceAlertTypes.deleteMany();

    resetAutoIncrementCounter();
  }

  dropSeeders()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();

      console.log('Asset price_alert_types dropped\n');

      await dropPriceAssetsWatch();
    });
}

module.exports = dropPriceAssetsWatchTypes;