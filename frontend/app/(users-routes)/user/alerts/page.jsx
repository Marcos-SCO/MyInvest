import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { getUserSessionData } from "app/helpers/session/getUserSessionData";

import { Suspense } from "react";
import Loading from "app/loading";

import AlertList from './AlertList';

export default async function UserAssets() {
  const session = await getServerSession(nextAuthOptions);

  const { id, name, userId, firstName } = await getUserSessionData(session);

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">

      <h3 className="mb-5">{firstName} - Lista de alertas</h3>

      <>
        <Suspense fallback={<Loading />}>
          <AlertList userId={userId} />
        </Suspense>
      </>

    </div>
  )
}