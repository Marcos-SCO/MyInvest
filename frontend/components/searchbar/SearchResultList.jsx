// 'use client';

import { getBackendAssetType } from 'app/api/assets/helpers/assetHelpers';

import { useRouter } from "next/navigation";

import Link from "next/link";

const baseUrl = process.env.FRONT_END_BASE_URL;

function SearchResultsList({ results }) {

  const router = useRouter();

  function handleAssetPage(e, ticker, slugType) {
    const mouseLeftButton = e.button === 0;
    if (!mouseLeftButton) return;

    const assetPageUrl = `/asset/${slugType}/${ticker}`;

    router.push(assetPageUrl);
  }

  const isDisplayingResults =
    results?.length ? ' display-results' : '';

  return (
    <div className={`results-list${isDisplayingResults}`}>

      {results.map((result, id) => {
        const resultType = result.type;
        const resultName = result.name;
        const resultCode = result.code;

        const { backendCode, typeSlug, nameDescription } =
          getBackendAssetType(resultType);

        const assetPageUrl =
          `${baseUrl}/asset/${typeSlug}/${resultCode}`;

        return (
          <Link href={assetPageUrl} key={id}>
            <div className="search-results">
              <p>{resultName} - {resultCode}</p>
              <p>Preço: {result.price}</p>
              <p>Variação: {result.variation}</p>
              <p>TYPE vindo da api: {resultType}</p>
              <p>Tipo para cadastro no backend: {backendCode}</p>
              <p>Descrição do tipo: {nameDescription}</p>
            </div>
          </Link>
        )
      })}

    </div>
  );
};

export default SearchResultsList;