import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { Suspense } from "react";
import Loading from "app/loading";

import UserAssetsList from './UserAssetsList';

export default async function UserAssets() {
  const session = await getServerSession(nextAuthOptions);

  // const { token } = session;
  const credentialSession = session?.user;

  const { id, name } =
    credentialSession ? credentialSession : session;

  const firstNAme = name.split(' ')?.[0];

  const userId = session?.userId ?? id;

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">

      <h3 className="mb-5">{firstNAme} - Lista de ativos</h3>

      <>
        <Suspense fallback={<Loading />}>
          <UserAssetsList userId={userId} />
        </Suspense>
      </>

    </div>
  )
}