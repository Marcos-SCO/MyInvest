import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { fetchUserAlerts } from "app/api/assets/userAlerts/fetchUserAlerts";

import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import { Pagination } from '../../../../components/page/Pagination';
import AssetFavButton from '../../../../components/assets/assetButtons/assetFavButton/layout';
import { limitString } from '../../../helpers/dom';
import DisplaySvg from '../../../helpers/svg/DisplaySvg';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function AlertList({ ...props }) {
  const { userId, page = 1 } = props;

  const numberOfItens = 10;

  const fetchResults = await fetchUserAlerts({ id: userId, page, numberOfItens, includeSymbols: true });

  const fetchResultsData = fetchResults?.priceAlertsList;

  const basePaginationUrl = baseUrl + '/user/alerts/page/';
  const totalPages = fetchResults?.totalPages;

  const paginationParams = {
    basePaginationUrl,
    page,
    itensPerPage: numberOfItens,
    totalPages,
    totalItensCount: fetchResults?.totalItensCount
  }

  let countItens = 0;

  return (
    <>
      {!fetchResultsData && <>
        <p className="my-5 text-xl">Você não possui alertas cadastrados</p>
      </>}

      {fetchResultsData && fetchResultsData.map((result, key) => {
        const { id, priceAlertTypeId, expectedPrice, active, createdAt, updatedAt, assetDetails } = result;

        const priceTypeDescription =
          { 1: 'Menor ou igual a ', 2: 'Maior ou igual a ', }

        const { type, name, currentPrice, assetIcon } = assetDetails;
        const assetId = assetDetails?.id;

        const isStockAsset = type == 2;
        const ticker = name;

        const symbols = result
          ? JSON.parse(result?.symbols) : undefined;

        const assetLongName =
          symbols?.name ?? symbols?.companyName ?? ticker;

        const typeObj = getAssetTypeDescription(type);
        const nameDescription = typeObj?.nameDescription;
        const assetSlug = typeObj?.typeSlug;

        const assetLogoUrl = assetIcon;

        const assetUrl = `${baseUrl}/asset/${assetSlug}/${name}`;

        const expectedPriceForCurrentFormat =
          isStockAsset ? `$${expectedPrice}` : expectedPrice;

        const expectedPriceValue =
          formatCurrency(expectedPriceForCurrentFormat);

        const currentPriceValue = formatCurrency(currentPrice);

        const alertProps = { id, priceAlertTypeId, expectedPriceValue, name, nameDescription, assetSlug, currentPriceValue };

        countItens += 1;
        const applyLazyOrEager = countItens <= 2
          ? 'eager' : 'lazy';

        return (
          <div key={key} className="alert-asset-card asset-card-item" data-js="asset-card-item">

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
        );

      })}

      {<Pagination props={paginationParams} />}

    </>
  )
}
