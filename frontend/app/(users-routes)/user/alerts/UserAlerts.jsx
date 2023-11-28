import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserSessionData } from "app/helpers/session/getUserSessionData";

import { Suspense } from "react";
import Loading from "app/loading";

import AlertList from './AlertList';
import DisplaySvg from "../../../helpers/svg/DisplaySvg";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function UserAlerts({ page }) {
  const pageNumber = page || '1';

  const session = await getServerSession(nextAuthOptions);
  const sessionData = await getUserSessionData(session);

  const { id, name, userId, firstName } = sessionData;

  return (
    <div className="alert-lists py-10">

      <div className="list-page-header">
        <h3 className="title">{firstName} - Lista de alertas</h3>
        <Link rel="prefetch" href={`${baseUrl}/user/assets`} className="priceAlertModalButton myButtonSvg" title="Ir para página dos meus ativos">
          <DisplaySvg name={'checkCircle'} class="checkCircle" width="18" height="18" /> Ver todos meus ativos
        </Link>
      </div>

      <>
        <Suspense fallback={<Loading />}>
          <AlertList userId={userId} page={page} session={sessionData} />
        </Suspense>
      </>
    </div>
  )
}