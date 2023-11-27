import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AssetFavButton from '../assetButtons/assetFavButton/layout';
import PercentageVariation from '../symbols/PercentageVariation';

import { limitString } from '../../../app/helpers/dom';
import DisplaySvg from '../../../app/helpers/svg/DisplaySvg';
import OpenModalContainer from '../../modal/OpenModalHandler';

export default function UserAssetCard({ props }) {

  const assetUrl = props?.assetUrl;
  const assetId = props?.assetId;
  const userId = props?.userId;
  const ticker = props?.ticker;
  const nameDescription = props?.nameDescription;
  const assetLongName = props?.assetLongName;
  const assetLogoUrl = props?.assetLogoUrl ?? false;

  const currentPrice = props?.currentPrice ?? false;
  const updatedAtString = props?.updatedAtString ?? false;
  const symbols = props?.symbols ?? false;

  const applyLazyOrEager = props?.applyLazyOrEager ?? 'lazy';

  return (
    <div className="asset-card-item" data-js="asset-card-item">

      <div className='asset-info-details'>
        <div className="header-container">
          {<AssetFavButton assetId={assetId} userId={userId} />}
        </div>
        <Link href={assetUrl} title={`Ir para página do ${ticker}`}>
          <figure>
            <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading={applyLazyOrEager} />
            <figcaption>
              <p className="asset-title">{ticker}</p>
              <div className='asset-description'>
                <small className='assetLongName'>{nameDescription}</small> <span> - </span>
                <small className='assetLongName'>{limitString(assetLongName, 50)}</small>
              </div>
            </figcaption>
          </figure>
        </Link>

        <div className='price-description'>
          <div className='description-header'>
            <Link href={`${assetUrl}`}>
              <p className='current-price'>{currentPrice}</p>
            </Link>
            <Link href={`${assetUrl}`}>
              {<PercentageVariation symbols={symbols} />}
            </Link>
          </div>
          {updatedAtString &&
            <small>
              {<p>Atualizado em {updatedAtString}</p>}
            </small>}
        </div>

      </div>

      <div className='side-buttons'>

        {userId && <Link rel="prefetch" href={`${assetUrl}#price-modal`} className="priceAlertModalButton myButtonSvg">
          <DisplaySvg name={'bell'} width="18" height="18" /> Definir Alerta de preço
        </Link>}

        {!userId && <OpenModalContainer className="priceAlertModalButton myButtonSvg" modalId={'authContainer'}>
          <DisplaySvg name={'bell'} width="18" height="18" /> Definir Alerta de preço
        </OpenModalContainer>}

      </div>

    </div>
  )
}
