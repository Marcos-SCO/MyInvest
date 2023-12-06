const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const assetTopListInserts = require('./insert/topList/assetTopListInserts-seeder');

async function seedAssetTopListTypes() {
  async function seed() {

    const topListTypesToSeed = ['ações', 'stocks', 'fiis'];

    for (const type of topListTypesToSeed) {

      const existingTopListType = await prisma.topAssetListTypes.findUnique({
        where: {
          name: type,
        },
      });

      if (existingTopListType) {
        // console.log(`Asset type '${type}' already exists\n`);
      }

      if (!existingTopListType) {
        // Insert the account type if it doesn't exist
        await prisma.topAssetListTypes.create({
          data: {
            name: type,
          },
        });

        console.log(`Top list type '${type}' inserted`);
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

module.exports = seedAssetTopListTypes;