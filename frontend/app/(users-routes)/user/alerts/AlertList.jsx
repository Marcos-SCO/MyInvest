import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { fetchUserAlerts } from "app/api/assets/userAlerts/fetchUserAlerts";

import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import AlertDetails from "components/alerts/AlertDetails";

import { Pagination } from '../../../../components/page/Pagination';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function AlertList({ ...props }) {
  const { userId, page = 1 } = props;

  const numberOfItens = 10;

  const fetchResults = await fetchUserAlerts({ id: userId, page, numberOfItens });

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

        const { type, name, currentPrice, assetIcon } = assetDetails;

        const isStockAsset = type == 2;

        const typeObj = getAssetTypeDescription(type);
        const nameDescription = typeObj?.nameDescription;
        const assetSlug = typeObj?.typeSlug;

        const assetLogoUrl = assetIcon;

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
          <div key={key} className="mb-3 w-100 min-w-[300px] border-t-4" data-js="asset-container">

            <Link rel="prefetch" href={`/asset/${assetSlug}/${name}`} className="block p-2 w-40 border border-gray-300 rounded-md mb-2">Ir até a página do ativo</Link>

            <Image src={assetLogoUrl} width={50} height={50} alt={name} title={name} loading={applyLazyOrEager} />

            {<AlertDetails alertProps={alertProps} />}

          </div>
        );

      })}

      {<Pagination props={paginationParams} />}

    </>
  )
}
