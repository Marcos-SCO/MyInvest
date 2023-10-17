const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function dropAssetNamedTypes() {

  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE asset_types AUTO_INCREMENT = 1;`;

      console.log('asset_types : auto-increment counter reset\n');
    } catch (error) {
      console.error('Error resetting asset_types auto-increment counter:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  resetAutoIncrementCounter();

  async function dropSeeders() {
    // Delete all data from Asset types
    await prisma.assetTypes.deleteMany();

    console.log('Asset Type Seeders dropped\n\n');

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

module.exports = dropAssetNamedTypes;