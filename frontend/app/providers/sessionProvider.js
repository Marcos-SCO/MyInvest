'use client'

import { SessionProvider } from "next-auth/react";

export const NextAuthSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
};