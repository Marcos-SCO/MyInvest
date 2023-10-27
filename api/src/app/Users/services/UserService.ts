import AuthError from '@/app/Auth/exceptions/AuthError';
import UserFormInterface from '@/app/Interfaces/UserFormInterface';

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function handlePasswordInsert(password: string, userId: number) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userPassword = await prisma.usersPassword.create({
    data: {
      password: hashedPassword,
      userId: userId,
    }
  });

  return { password: userPassword?.password };
}

async function handleEmailInsert(email: string, userId: number) {
  const userEmail = await prisma.userEmails.create({
    data: {
      email,
      userId: userId
    }
  });

  return { email: userEmail?.email };
}


const UserService = () => {

  async function SignUp(formArgs: UserFormInterface): Promise<{ user: object, message: string }> {
    const { firstName, lastName, email, accountType = 1, password } = formArgs;

    const isEmailAccountType = accountType == 1;
    // console.log('Account type:', accountType);

    const existingUserEmail = await prisma.userEmails.findFirst({
      where: { email },
    });

    if (existingUserEmail) {
      throw new AuthError(`User already exists`);
    }


    try {
      const userDataObj = {
        data: {
          firstName,
          lastName,
          accountType: 1
        }
      }

      if (!isEmailAccountType) {
        // account with a provider type
        userDataObj.data = { ...userDataObj.data, accountType }
      }

      const newUser = await prisma.users.create(userDataObj);

      const lastInsertedId = newUser.id;

      let dataOjb = {
        userId: lastInsertedId,
        newUser
      }

      if (email) {
        const userEmail =
          await handleEmailInsert(email, lastInsertedId);

        dataOjb = { ...dataOjb, ...userEmail };
      }

      if (isEmailAccountType && password) {

        const userPassword =
          await handlePasswordInsert(password, lastInsertedId);

        dataOjb = { ...dataOjb, ...userPassword };
      }


      console.log('User created:', dataOjb);

      return {
        user: dataOjb,
        message: 'User created successfully!'
      }

    } catch (error) {
      // console.log(error);
      throw new AuthError(`Error creating user`);
    } finally {
      await prisma.$disconnect();
    }

  }

  return { SignUp }
}

export default UserService;