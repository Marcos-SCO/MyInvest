const { PrismaClient } = require('@prisma/client');

const faker = require('faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seedUsers() {

  async function seed() {

    const users = Array.from({ length: 10 }, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }));

    const insertedUsers = await prisma.users.createMany({
      data: users,
    });

    const lastInsertedUserItens = await prisma.users.findMany({
      orderBy: { id: 'desc', },
      take: 10,
    });

    if (!lastInsertedUserItens) {
      console.log('No users found.');
      return;
    }

    const last10Users = lastInsertedUserItens.slice().reverse();

    // Generate a salt and hash the password
    const hashedPassword = await bcrypt.hash('password', 10);

    const usersPasswordData = last10Users.map((user, index) => ({
      password: hashedPassword,
      userId: user.id
    }));

    const userEmailsData = last10Users.map((user, index) => ({
      email: `${user.firstName.toLowerCase()}@${faker.internet.domainName().toLowerCase()}`,
      userId: user.id,
    }));

    // Insert into related tables
    await prisma.usersPassword.createMany({
      data: usersPasswordData
    })

    await prisma.userEmails.createMany({
      data: userEmailsData,
    });

    console.log('Seed data inserted');
  }

  seed()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

}

module.exports = seedUsers;