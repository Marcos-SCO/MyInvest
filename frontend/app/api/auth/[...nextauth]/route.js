import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import dotenv from 'dotenv';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }