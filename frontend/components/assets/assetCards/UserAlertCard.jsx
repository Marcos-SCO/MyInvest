import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { limitString } from '../../../app/helpers/dom';
import DisplaySvg from '../../../app/helpers/svg/DisplaySvg';

import AssetFavButton from '../assetButtons/assetFavButton/layout';

const priceTypeDescription =
  { 1: 'Menor ou igual a ', 2: 'Maior ou igual a ', }

export default function UserAlertCard({ props }) {

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

  return (
    <div className="alert-asset-card asset-card-item" data-js="asset-card-item">

      <div className='asset-info-details'>
        <div className="header-container">
          {<AssetFavButton assetId={assetId} userId={userId} removeItem={false} />}
        </div>

        <Link href={assetUrl} title={`Ir para página do ${ticker}`}>
          <figure>
            <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading={applyLazyOrEager} />
            <figcaption>
              <p className="asset-title">{ticker}</p>
              <small className='assetLongName'>{limitString(assetLongName, 50)}</small>
              <small>{nameDescription}</small>
            </figcaption>
          </figure>
        </Link>
      </div>

      <div className='alert-details'>
        <div className="alert-status">
          <DisplaySvg name="bell" width="30" height="30" /> Alerta ativo
        </div>
        <div>
          <small className='currentPrice'>Preço atual: <span className='currentPriceValue'>{currentPriceValue}</span></small>

          <p className='programmed'>Programado para <br /> <span className='description'>{priceTypeDescription[priceAlertTypeId]}</span> <span className='programmed-price'>{expectedPriceValue}</span>
          </p>
        </div>
      </div>

    </div>
  )
}
