'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

import { fetchUserAssets } from "app/api/assets/userAssets/fetchUserAssets";

import AssetFavButton from "components/assets/assetButtons/assetFavButton/layout";
import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import SymbolsBr from "../../../../components/assets/symbols/SymbolsBr";
import SymbolsUs from "../../../../components/assets/symbols/SymbolsUs";

import OpenModalContainer from '../../../../components/modal/OpenModalHandler';

import { Pagination } from '../../../../components/page/Pagination';
import DisplaySvg from '../../../helpers/svg/DisplaySvg';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function UserAssetsList({ ...props }) {

  const session = props?.session;

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

        const currentPrice = formatCurrency(assetDetails?.currentPrice);

        countItens += 1;
        const applyLazyOrEager = countItens <= 2
          ? 'eager' : 'lazy';

        return (
          <div key={key} className="mb-3 w-100 min-w-[300px] border-t-4" data-js="asset-container">

            <AssetFavButton assetId={id} userId={userId} />

            <button rel="prefetch" data-href={`${baseUrl}/asset/${assetSlug}/${name}`} className="priceAlertModalButton myButtonSvg" onClick={(e) => {
              window.location.href = `${baseUrl}/asset/${assetSlug}/${name}/` + '#price-modal';
            }}>
              <DisplaySvg name={'bell'} width="18" height="18" /> Definir Alerta de preço
            </button>

            <Link rel="prefetch" href={`${baseUrl}/asset/${assetSlug}/${name}`} className="activePageButton myButtonSvg">Ir até a página do ativo</Link>

            <Image src={assetLogoUrl} width={50} height={50} alt={name} title={name} loading={applyLazyOrEager} />

            {!isStockAsset && <SymbolsBr symbols={symbolsData} />}

            {isStockAsset && <SymbolsUs symbols={symbolsData} />}

            <p>Preço atual: {currentPrice}</p>

          </div>
        );

      })}

      {<Pagination props={paginationParams} />}

    </ >
  )
}
