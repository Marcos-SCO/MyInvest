"use client";

import React from 'react';
import Link from 'next/link';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginControls({ session = false }) {
  const { status } = useSession();

  const isUserAuthenticated = status === 'authenticated';
  const isServerSession = session?.email || session?.token;

  return (
    <>
      {isServerSession || isUserAuthenticated ? (
        <button onClick={() => signOut()} className="bg-slate-900 text-white px-6 py-2 rounded-md">Sair</button>
      ) : (
        // <button onClick={() => signIn('google')} className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</button>
        <Link href="/signIn" className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</Link>
      )}
    </>
  )
}
