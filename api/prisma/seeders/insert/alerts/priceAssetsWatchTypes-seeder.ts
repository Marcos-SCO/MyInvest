const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedPriceAssetsWatchTypes() {
  async function seed() {

    const priceAlertTypesToSeed = ['Menor ou igual', 'Maior ou igual'];

    for (const type of priceAlertTypesToSeed) {

      const existingAssetType = await prisma.priceAlertTypes.findUnique({
        where: {
          name: type,
        },
      });

      if (existingAssetType) {
        // console.log(`Asset type '${type}' already exists\n`);
      }

      if (!existingAssetType) {
        // Insert the account type if it doesn't exist
        await prisma.priceAlertTypes.create({
          data: {
            name: type,
          },
        });

        console.log(`Price alert type '${type}' inserted`);
      }

    }
  }

  seed()
    .catch(e => {
      console.error(e);
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = seedPriceAssetsWatchTypes;