import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { Suspense } from "react";
import Loading from "app/loading";

import UserAssetsList from './UserAssetsList';
import { getUserSessionData } from "app/helpers/session/getUserSessionData";
import Link from "next/link";
import DisplaySvg from "../../../helpers/svg/DisplaySvg";

export default async function UserAssets({ page }) {
  const pageNumber = page || '1';

  const session = await getServerSession(nextAuthOptions);

  const sessionData = await getUserSessionData(session);

  const { id, userId, name, firstName, token } = sessionData;

  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

  return (
    <div className="user-assets py-10">

     <div className="list-page-header">
       <h3 className="title">{firstName} - Lista de ativos</h3>
       <Link rel="prefetch" href={`${baseUrl}/user/alerts`} className="priceAlertModalButton myButtonSvg" title="Ir para página dos meus alertas">
         <DisplaySvg name={'bell'} width="18" height="18" /> Ver todos meus alertas
       </Link>
     </div>

      <>
        <Suspense fallback={<Loading />}>
          <UserAssetsList userId={userId} page={page} session={sessionData} />
        </Suspense>
      </>

    </div>
  )
}