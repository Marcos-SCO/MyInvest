import AuthError from '@/app/Auth/exceptions/AuthError';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserModel = () => {

  async function getHashedPassword(userId: number) {
    const hashedPassword = await prisma.usersPassword.findFirst({
      where: { userId }
    });

    if (!hashedPassword) {
      console.error(`User password credentials not founded`);
      throw new AuthError(`User password credentials not founded`);
    }

    return hashedPassword;
  }

  async function getEmail(email: string) {
    const userEmailData = await prisma.userEmails.findFirst({
      where: { email },
    });

    if (!userEmailData) {
      console.error(`Email: ${email} was not founded`);
      throw new AuthError(`Email: ${email} was not founded`);
    }

    return userEmailData;
  }

  async function getUserByEmail(email: string) {

    const userEmailData = await getEmail(email);
  
    const emailData = userEmailData?.email;
    const userId = userEmailData?.userId;

    const user = await prisma.users.findUnique({
      where: { id: userId }
    });

    if (!user) {
      console.error('Error retrieving user:');
      throw new AuthError("User not found");
    }

    const userData = { ...user, email: emailData }

    return userData;
  }

  async function updateUser(args: any) {
    const { id, first_name, last_name, email = false } = args;

    const dataToUpdate: any = {
      lastName: last_name,
      firstName: first_name,
    }

    if (email) {
      dataToUpdate['UserEmail'] = {
        updateMany: {
          where: { userId: id },
          data: {
            email: email,
          },
        },
      }
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        ...dataToUpdate
      }
    });

    return updatedUser;
  }

  async function getAllByPagination(args: any) {
    const { page = 1, numberOfItens = 10, orderBy = false } = args;

    const skip = (page - 1) * numberOfItens;
    // Calculate the number of records to skip

    const queryObj: any = {
      skip,
      take: +numberOfItens
    }

    if (orderBy) {
      queryObj['orderBy'] = orderBy
    }

    const users = await prisma.users.findMany(queryObj);

    await prisma.$disconnect();

    return users;
  }

  return { getAllByPagination, updateUser, getHashedPassword, getEmail, getUserByEmail }
}

export default UserModel;