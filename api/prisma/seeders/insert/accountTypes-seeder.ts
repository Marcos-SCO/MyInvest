const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedAccountTypes() {
  async function seed() {

    const accountTypesToSeed = ['email', 'google'];

    for (const type of accountTypesToSeed) {

      const existingAccountType = await prisma.accountTypes.findUnique({
        where: {
          type: type,
        },
      });

      if (existingAccountType) {
        // console.log(`Account type '${type}' already exists\n`);
      }

      if (!existingAccountType) {
        // Insert the account type if it doesn't exist
        await prisma.accountTypes.create({
          data: {
            type: type,
          },
        });

        console.log(`Account type '${type}' inserted`);
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

module.exports = seedAccountTypes;