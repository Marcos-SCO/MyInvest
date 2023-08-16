"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  const isUserAuthenticated = status === 'authenticated';

  return (
    <div className="p-4 flex justify-between item-center shadow-md">
      <Link className="font-bold text-lg text-green-700" href={'/'}>MyInvest</Link>

      {isUserAuthenticated ? (
        <button onClick={() => signOut()} className="bg-slate-900 text-white px-6 py-2 rounded-md">Sair</button>
      ) : (
        <button onClick={() => signIn('google')} className="bg-slate-900 text-white px-6 py-2 rounded-md">Login</button>
      )}

    </div>
  );
}