import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserSessionData } from "app/helpers/session/getUserSessionData";

import { Suspense } from "react";
import Loading from "app/loading";

import AlertList from './AlertList';

export default async function UserAlerts({ page }) {
  const pageNumber = page || '1';

  const session = await getServerSession(nextAuthOptions);
  const sessionData = await getUserSessionData(session);

  const { id, name, userId, firstName } = sessionData;

  return (
    <div className="alert-lists">
      <h3 className="mb-5">{firstName} - Lista de alertas</h3>
      <>
        <div className="cards-container user-cards-container">
          <Suspense fallback={<Loading />}>
            <AlertList userId={userId} page={page} session={sessionData} />
          </Suspense>
        </div>
      </>
    </div>
  )
}