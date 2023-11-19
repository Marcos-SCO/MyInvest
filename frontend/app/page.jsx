import Link from "next/link";

import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <div className='grid place-items-center h-screen -mt-24'>

        <div>
          <h1 className="text-lg">Aplicação em progresso!!!</h1>
          {session && <Link className="font-bold text-lg text-green-700 text-center" href={'/admin'}>Ir para o Admin</Link>}
        </div>

      </div>
    </>
  );
}
