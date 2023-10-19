const { PrismaClient } = require('@prisma/client');

const dropUserTypes = require("./drop-accountTypes.ts");

const prisma = new PrismaClient();

function dropUsers() {
  async function resetAutoIncrementCounter() {
    try {
      await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`;

      await prisma.$executeRaw`ALTER TABLE users_password AUTO_INCREMENT = 1;`;

      await prisma.$executeRaw`ALTER TABLE user_emails AUTO_INCREMENT = 1;`;

      console.log('Auto-increment counter reset');
    } catch (error) {
      console.error('Error resetting auto-increment counter:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  resetAutoIncrementCounter();

  async function dropSeeders() {
    // Delete all data from Users and related tables
    await prisma.usersPassword.deleteMany();
    await prisma.userEmails.deleteMany();
    await prisma.users.deleteMany();

    console.log('Users seeder dropped\n');

    resetAutoIncrementCounter();
  }

  dropSeeders()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();

      await dropUserTypes();
    });
}

module.exports = dropUsers;