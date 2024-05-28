'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { removeLocalStorageItem } from "../../app/helpers/localstorage/assetsLocalStorage";

export default function ButtonLogout() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false
    });

    await removeLocalStorageItem('userAssets');

    router.replace('/');
    window.location.reload();
  }

  return <button onClick={logout} className="p-2 w-40 border border-gray-300 rounded-md">Sair</button>
}