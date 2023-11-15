import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { fetchUserAssets } from "app/api/assets/userAssets/fetchUserAssets";

import AssetFavButton from "components/AssetButtons/layout";
import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import AssetDetails from "components/assets/AssetDetails";
import StockAssetDetails from "components/assets/StockAssetDetails";

import { Pagination } from '../../../../components/page/Pagination';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function UserAssetsList({ ...props }) {
  const { userId, page = 1 } = props;

  const numberOfItens = 10;

  const fetchResults = await fetchUserAssets({ id: userId, page, numberOfItens });

  const fetchResultsData = fetchResults.assetsList;

  const basePaginationUrl = baseUrl + '/user/assets/page/';
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
        <p className="my-5 text-xl">Você não possui ativos favoritados</p>
      </>}

      {fetchResultsData && fetchResultsData.map((result, key) => {
        const { id, type, name, assetDetails } = result;

        const isStockAsset = type == 2;

        const typeObj = getAssetTypeDescription(type);
        const nameDescription = typeObj?.nameDescription;
        const assetSlug = typeObj?.typeSlug;

        const symbolsData = JSON.parse(assetDetails?.symbols);

        const assetLogoUrl = assetDetails?.assetIcon
          ?? 'https://brapi.dev/favicon.svg';

        if (isStockAsset) {
          // console.log(symbolsData);
        }

        const currentPrice = formatCurrency(assetDetails?.currentPrice);

        const symbolProps = { id, name, symbolsData, nameDescription, assetSlug, currentPrice };

        countItens += 1;
        const applyLazyOrEager = countItens <= 2
          ? 'eager' : 'lazy';

        return (
          <div key={key} className="mb-3 w-100 min-w-[300px] border-t-4" data-js="asset-container">

            <AssetFavButton assetId={id} userId={userId} />

            <Link rel="prefetch" href={`/asset/${assetSlug}/${name}`} className="block p-2 w-40 border border-gray-300 rounded-md mb-2">Ir até a página do ativo</Link>

            <Image src={assetLogoUrl} width={50} height={50} alt={name} title={name} loading={applyLazyOrEager} />

            {!isStockAsset && <AssetDetails symbolProps={symbolProps} />}

            {isStockAsset && <StockAssetDetails symbolProps={symbolProps} />}

          </div>
        );

      })}

      {<Pagination props={paginationParams} />}

    </>
  )
}
