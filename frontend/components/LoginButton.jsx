"use client";

import React from 'react'

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { status } = useSession();
  const isUserAuthenticated = status === 'authenticated';

  return (
    <>
      {isUserAuthenticated ? (
        <button onClick={() => signOut()} className="bg-slate-900 text-white px-6 py-2 rounded-md">Sair</button>
      ) : (
        <button onClick={() => signIn('google')} className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</button>
      )}
    </>
  )
}
