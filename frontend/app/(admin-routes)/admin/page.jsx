import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/ButtonLogout";

import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);

  const { token } = session;
  const { name, email } = session?.user;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl mb-8">Olá, {name}. Bem vindo(a)!</h1>

      <p className="mb-8">E-mail: {email}</p>

      {token && <p className="break-words w-full mb-8 max-[100px font-bold">Token de sessão: <span className="text-green-700">{token}</span></p>}

      <ButtonLogout />
    </div>
  )
}