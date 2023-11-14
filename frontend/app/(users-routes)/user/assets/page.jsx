import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { Suspense } from "react";
import Loading from "app/loading";

import UserAssetsList from './UserAssetsList';
import { getUserSessionData } from "app/helpers/session/getUserSessionData";

export default async function UserAssets() {
  const session = await getServerSession(nextAuthOptions);

  const { id, userId, name, firstName, token } =
    await getUserSessionData(session);

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">

      <h3 className="mb-5">{firstName} - Lista de ativos</h3>

      <>
        <Suspense fallback={<Loading />}>
          <UserAssetsList userId={userId} />
        </Suspense>
      </>

    </div>
  )
}