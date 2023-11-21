"use client";

import React from 'react';
import Link from 'next/link';

import { signIn, signOut, useSession } from "next-auth/react";

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function LoginControls({ session = false }) {
  const { status } = useSession();

  const isUserAuthenticated = status === 'authenticated';
  const isServerSession = session?.email || session?.token;

  const isLoginUser = isServerSession || isUserAuthenticated;

  return (
    <>
      {/* {isLoginUser ? (
        <button onClick={() => signOut()} className="bg-slate-900 text-white px-6 py-2 rounded-md">Sair</button>
      ) : (
        // <button onClick={() => signIn('google')} className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</button>
        <a href={`${baseUrl}/signIn`} className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</a>
      )} */}

      {!isLoginUser && (<a href={`${baseUrl}/signIn`} className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</a>)}
    </>
  )
}
