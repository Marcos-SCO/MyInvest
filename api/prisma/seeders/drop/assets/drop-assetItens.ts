const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function dropAssetItens() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE assets AUTO_INCREMENT = 1;`;
      await prisma.$executeRaw`ALTER TABLE asset_details_list AUTO_INCREMENT = 1;`;

      // console.log('Drop Asset itens : auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting asset_types auto-increment counter:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  resetAutoIncrementCounter();

  async function dropSeeders() {
    // Delete all data from Asset types
    await prisma.assets.deleteMany();

    await prisma.assetDetailsList.deleteMany();

    resetAutoIncrementCounter();
  }

  dropSeeders()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();

      console.log('Asset itens dropped\n');
    });
}

module.exports = dropAssetItens;