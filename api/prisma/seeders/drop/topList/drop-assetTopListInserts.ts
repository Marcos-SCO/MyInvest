const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const dropAssetTopListTypes = require('./drop-assetTopListTypes');

function dropAssetTopListInserts() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE top_asset_list_itens AUTO_INCREMENT = 1;`;

      // console.log('asset_types : auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting top_asset_list_itens auto-increment counter:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  resetAutoIncrementCounter();

  async function dropSeeders() {
    // Delete all data from Asset types
    await prisma.topAssetListItens.deleteMany();

    resetAutoIncrementCounter();
  }

  dropSeeders()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();

      console.log('Asset top_asset_list_itens dropped\n');

      await dropAssetTopListTypes();
    });
}

module.exports = dropAssetTopListInserts;