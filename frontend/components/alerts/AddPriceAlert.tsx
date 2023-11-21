import React from 'react'

import { addPriceAlert } from '../../app/api/assets/userAlerts/addPriceAlert';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getUserSessionData } from '../../app/helpers/session/getUserSessionData';

import AlertPriceForm from './form/AlertPriceForm';

export default async function AddPriceAlert(props) {

  const { sessionProp = false, assetId, assetTicker, assetCurrentPrice = 0 } = props;

  const session = !sessionProp ?
    await getServerSession(nextAuthOptions) : sessionProp;

  const sessionData = await getUserSessionData(session);

  const userId = sessionData?.userId;
  const token = sessionData?.token;

  const insertAlertObj = {
    token,
    userId,
    assetId,
    assetTicker,
    assetCurrentPrice,
  }

  return (
    <div>
      {!userId && (<p className="my-6 text-large">Usuário não logado</p>)}


      {userId &&

        <>
          <p>{assetTicker}</p>
          <p>{assetCurrentPrice}</p>
          <AlertPriceForm insertAlertObj={insertAlertObj} />
        </>
      }

    </div>
  )
}
