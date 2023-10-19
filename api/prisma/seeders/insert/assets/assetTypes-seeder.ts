const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedAssetTypes() {
  async function seed() {

    const assetTypesToSeed = ['ações', 'stocks', 'fiis'];

    for (const type of assetTypesToSeed) {

      const existingAssetType = await prisma.assetTypes.findUnique({
        where: {
          name: type,
        },
      });

      if (existingAssetType) {
        // console.log(`Asset type '${type}' already exists\n`);
      }

      if (!existingAssetType) {
        // Insert the account type if it doesn't exist
        await prisma.assetTypes.create({
          data: {
            name: type,
          },
        });

        console.log(`Asset type '${type}' inserted`);
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

module.exports = seedAssetTypes;