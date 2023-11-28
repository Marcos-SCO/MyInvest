import Link from "next/link";
import Image from 'next/image';

import { fetchUserAssets } from "app/api/assets/userAssets/fetchUserAssets";

import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import { Pagination } from '../../../../components/page/Pagination';
import UserAssetCard from "../../../../components/assets/assetCards/UserAssetCard";
import DisplaySvg from "../../../helpers/svg/DisplaySvg";

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

export default async function UserAssetsList({ ...props }) {

  const session = props?.session;

  const { userId, page = 1 } = props;

  const numberOfItens = 12;

  const fetchResults = await
    fetchUserAssets({ id: userId, page, numberOfItens });

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

      {!fetchResultsData &&
        <p className="my-5 text-xl">Você não possui ativos favoritados</p>
      }

      <div className="cards-container user-cards-container">
        {fetchResultsData && fetchResultsData.map((result, key) => {
          const { id: assetId, name, type } = result;
          const assetDetailList = result?.assetDetails;

          const isStockAsset = type == 2;
          const ticker = name;

          const symbols = assetDetailList
            ? JSON.parse(assetDetailList?.symbols) : undefined;

          const updatedAt = assetDetailList?.updatedAt;

          const assetLongName =
            symbols?.name ?? symbols?.companyName ?? ticker;

          const updatedAtString = updatedAt ?
            new Date(updatedAt).toLocaleDateString('pt-BR') : false;

          const typeObj = getAssetTypeDescription(type);
          const nameDescription = typeObj?.nameDescription;
          const assetSlug = typeObj?.typeSlug;

          const assetLogoUrl = assetDetailList?.assetIcon
            ?? 'https://brapi.dev/favicon.svg';

          const currentPrice = formatCurrency(assetDetailList?.currentPrice);

          const assetUrl = `${baseUrl}/asset/${assetSlug}/${name}`;

          countItens += 1;
          const applyLazyOrEager = countItens <= 3
            ? 'eager' : 'lazy';

          const props = {
            assetUrl,
            assetId,
            userId,
            ticker,
            assetUrl,
            nameDescription,
            assetLongName,
            assetLogoUrl,
            currentPrice,
            updatedAtString,
            symbols,
            applyLazyOrEager
          }

          return (
            <UserAssetCard key={key} props={props} />
          );

        })}
      </div>

      {<Pagination props={paginationParams} />}

    </ >
  )
}
