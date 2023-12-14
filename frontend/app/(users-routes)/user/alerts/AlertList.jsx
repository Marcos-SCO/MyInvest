import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { fetchUserAlerts } from "app/api/assets/userAlerts/fetchUserAlerts";

import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import { Pagination } from '../../../../components/page/Pagination';
import UserAlertCard from '../../../../components/assets/assetCards/UserAlertCard';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function AlertList({ ...props }) {
  const { session, userId, page = 1 } = props;

  const token = session?.token;

  const numberOfItens = 12;

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
        <p className="my-5 text-xl you-dont-posses-text">Você ainda não possui alertas cadastrados...</p>
      </>}

      <div className='cards-container user-cards-container'>
        {fetchResultsData && fetchResultsData.map((result, key) => {
          const { id, priceAlertTypeId, expectedPrice, active, createdAt, updatedAt, assetDetails } = result;

          const createdAtString = createdAt ?
            new Date(createdAt).toLocaleDateString('pt-BR') : false;

          const updatedAtString = updatedAt ?
            new Date(updatedAt).toLocaleDateString('pt-BR') : false;

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

          const assetCurrentPriceValue = type == 2
            ? `$` + currentPrice : currentPrice;

          const currentPriceValue = formatCurrency(assetCurrentPriceValue);

          countItens += 1;
          const applyLazyOrEager = countItens <= 3
            ? 'eager' : 'lazy';

          const cardProps = {
            token,
            alertId: id,
            userId,
            assetId,
            assetUrl,
            assetLogoUrl,
            assetLongName,
            applyLazyOrEager,
            ticker,
            nameDescription,
            currentPrice,
            currentPriceValue,
            priceAlertTypeId,
            expectedPriceValue,
            createdAtString,
            updatedAtString,
          }

          return (
            <UserAlertCard props={cardProps} key={key} />
          );

        })}
      </div>

      {<Pagination props={paginationParams} />}

    </>
  )
}
