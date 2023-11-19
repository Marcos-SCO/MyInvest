import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import ButtonLogout from "components/auth/ButtonLogout";
import UserInfoProvider from "components/auth/UserInfoProvider";

import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);

  const { token } = session;
  const credentialSession = session?.user;

  const { name, email, image } =
    credentialSession ? credentialSession : session;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-10">

      {!image && <div>
        <h1 className="text-2xl mb-8">Olá, {name}. Bem vindo(a)!</h1>
        <p className="mb-8">E-mail: {email}</p>
      </div>}

      {image && <UserInfoProvider />}

      {token && <p className="break-words w-full mb-8 max-[100px font-bold">Token de sessão: <span className="text-green-700">{token}</span></p>}

      <ButtonLogout />
    </div>
  )
}