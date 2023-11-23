import React from 'react'

import { addPriceAlert } from '../../app/api/assets/userAlerts/addPriceAlert';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getUserSessionData } from '../../app/helpers/session/getUserSessionData';

import AlertPriceForm from './form/AlertPriceForm';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

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
      {userId &&
        <>
          <div className='alert-price-container'>
            <div className='header-price-alert flex flex-wrap justify-between alert-container md:px-6 md:space-x-4'>
              <div className='info'>
                <p className='ticker'>{assetTicker}</p>
                <p className='currentValue'>Valor atual : <span>{assetCurrentPrice}</span></p>
              </div>
              <div className='link-container'>
                <Link rel="prefetch" href={`${baseUrl}/user/alerts`} className='myButton silver'>Meus alertas</Link>
              </div>
            </div>

            <AlertPriceForm insertAlertObj={insertAlertObj} />

          </div>
        </>
      }
    </div>
  )
}
