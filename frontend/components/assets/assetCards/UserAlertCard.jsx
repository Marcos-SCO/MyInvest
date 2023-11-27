import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { limitString } from '../../../app/helpers/dom';
import DisplaySvg from '../../../app/helpers/svg/DisplaySvg';

import AssetFavButton from '../assetButtons/assetFavButton/layout';
import UserRemoveAlertButton from '../assetButtons/userAlertButton/UserRemoveAlertButton';

const priceTypeDescription =
  { 1: 'Menor ou igual a ', 2: 'Maior ou igual a ', }

export default function UserAlertCard({ props }) {

  const token = props?.token;
  const alertId = props?.alertId;
  const userId = props?.userId;
  const assetId = props?.assetId;
  const assetUrl = props?.assetUrl;
  const assetLogoUrl = props?.assetLogoUrl;
  const assetLongName = props?.assetLongName;
  const applyLazyOrEager = props?.applyLazyOrEager;
  const ticker = props?.ticker;
  const nameDescription = props?.nameDescription;
  const currentPrice = props?.currentPrice;
  const currentPriceValue = props?.currentPriceValue;
  const priceAlertTypeId = props?.priceAlertTypeId;
  const expectedPriceValue = props?.expectedPriceValue;

  const createdAtString = props?.createdAtString;
  const updatedAtString = props?.updatedAtString;

  const timeStatus = createdAtString || updatedAtString;

  return (
    <div className="alert-asset-card asset-card-item" data-js="asset-card-item">

      <div className='asset-info-details'>
        <div className="header-container">
          <div>
            <div className="alert-status">
              <DisplaySvg name="bell" width="30" height="30" /> Alerta ativo
            </div>

            {timeStatus && <>
              <p className='timeStatus'>
                {createdAtString &&
                  <small>Criado em {createdAtString}</small>}
                {updatedAtString && (<span>-</span>)}
                {updatedAtString &&
                  <small>Atualiazado em {updatedAtString}</small>}
              </p>
            </>}
          </div>

          {<UserRemoveAlertButton props={{ userId, alertId, token }} width={50} height={50} />}
        </div>

        <Link href={assetUrl} title={`Ir para página do ${ticker}`}>
          <figure>
            <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading={applyLazyOrEager} />
            <figcaption>
              <p className="asset-title">{ticker}</p>
              <div className='asset-description'>
                <small>{nameDescription}</small><span> - </span>
                <small className='assetLongName'>{limitString(assetLongName, 50)}</small>
              </div>
            </figcaption>
          </figure>
        </Link>
      </div>

      <div className='alert-details'>

        {<AssetFavButton assetId={assetId} userId={userId} removeItem={false} />}

        <div>
          <small className='currentPrice'>Preço atual: <span className='currentPriceValue'>{currentPriceValue}</span></small>

          <p className='programmed'>Programado para <br /> <span className='description'>{priceTypeDescription[priceAlertTypeId]}</span> <span className='programmed-price'>{expectedPriceValue}</span>
          </p>
        </div>
      </div>

    </div>
  )
}
