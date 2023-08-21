import AuthError from '@/app/Auth/exceptions/AuthError';
import UserFormInterface from '@/app/Interfaces/UserFormInterface';

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const UserService = () => {

  async function SignUp(formArgs: UserFormInterface): Promise<{ user: object, message: string }> {
    const { firstName, lastName, email, password } = formArgs;

    const existingUserEmail = await prisma.userEmails.findFirst({
      where: { email },
    });

    if (existingUserEmail) {
      throw new AuthError(`User already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.users.create({
        data: {
          firstName,
          lastName,
        }
      });

      const lastInsertedId = newUser.id;

      const userPassword = await prisma.usersPassword.create({
        data: {
          password: hashedPassword,
          userId: lastInsertedId,
        }
      })

      const userEmail = await prisma.userEmails.create({
        data: {
          email,
          userId: lastInsertedId
        }
      });

      console.log('User created:', newUser);

      return {
        user: { newUser, userPassword, userEmail },
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