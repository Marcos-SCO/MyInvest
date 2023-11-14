import dotenv from 'dotenv';

import { insertUserProvider, loginUser } from 'app/helpers/user/databaseFunctions';

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

dotenv.config();

const { API_BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const nextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { password: { label: 'password', type: 'password' } },
      },

      async authorize(credentials, req) {

        const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const user = await res.json();
        const userExists = user && res?.ok;

        if (!userExists) {
          console.log('Response data: ', user);

          throw new Error(user?.error);
          // return null;
        }

        return user;
      }
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),

  ],

  callbacks: {
    async signIn({ user, account }) {
      const { name, email } = user;

      if (account.provider === "google") {
        let userIdValue;

        const emailInProvider =
          await insertUserProvider({ name, email }, 2);

        const emailAlreadyExists = emailInProvider?.emailExists;

        if (emailAlreadyExists) {
          userIdValue = emailInProvider?.user.email?.userId;
          if (userIdValue) user.userId = userIdValue;

          return user;
        }

        const userInsertResult = emailInProvider;

        userIdValue = userInsertResult?.user?.userId;

        if (userIdValue) user.userId = userIdValue;
      }


      return user;
    },
    async jwt({ token, user }) {
      user && (token.user = user);

      const sessionHasToken = token?.user?.token;
      if (!user && !sessionHasToken) {
        const userEmail = token?.email;
        const user = await loginUser(userEmail, 2);

        // user && (token.user.token = user?.token)
        user && (token.user.token = user?.token)
      }

      return token;
    },
    async session({ session, token, user }) {
      session = token.user;

      return session;
    }
  },

  pages: {
    signIn: '/signIn'
  }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions }