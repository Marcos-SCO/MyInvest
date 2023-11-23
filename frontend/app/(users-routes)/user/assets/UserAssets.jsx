import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { Suspense } from "react";
import Loading from "app/loading";

import UserAssetsList from './UserAssetsList';
import { getUserSessionData } from "app/helpers/session/getUserSessionData";

export default async function UserAssets({ page }) {
  const pageNumber = page || '1';

  const session = await getServerSession(nextAuthOptions);

  const sessionData = await getUserSessionData(session);

  const { id, userId, name, firstName, token } = sessionData;

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">

      <h3 className="mb-5">{firstName} - Lista de ativos</h3>

      <>
        <Suspense fallback={<Loading />}>
          <UserAssetsList userId={userId} page={page} session={sessionData} />
        </Suspense>
      </>

    </div>
  )
}