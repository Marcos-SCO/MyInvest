import dotenv from 'dotenv';

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
      console.log('User: ', user);
      // console.log('Account: ', account);
      return user;
    },
    async jwt({ token, user }) {
      user && (token.user = user)
      return token;
    },
    async session({session, token}) {
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