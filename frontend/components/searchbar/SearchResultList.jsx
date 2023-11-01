// 'use client';

import { getBackendAssetType } from 'app/api/assets/helpers/assetHelpers';

import { useRouter } from "next/navigation";

function SearchResultsList({ results }) {

  const router = useRouter();

  function handleAssetPage(e, ticker, slugType) {

    const mouseLeftButton = e.button === 0;
    if (!mouseLeftButton) return;
    
    // const goToAssetPage =
    //   confirm(`Quer ir mesmo para a página do ativo ${ticker}?`);

    // if (!goToAssetPage) return;

    const assetPageUrl = `/asset/${slugType}/${ticker}`;

    router.push(assetPageUrl);

  }

  return (
    <div className="results-list">

      {results.map((result, id) => {
        const resultType = result.type;
        const resultName = result.name;
        const resultCode = result.code;

        const { backendCode, typeSlug, nameDescription } =
          getBackendAssetType(resultType);

        return (
          <div className="search-results" onClick={(e) => handleAssetPage(e, resultCode, typeSlug)} key={id}>
            <p>{resultName} - {resultCode}</p>
            <p>Preço: {result.price}</p>
            <p>Variação: {result.variation}</p>
            <p>TYPE vindo da api: {resultType}</p>
            <p>Tipo para cadastro no backend: {backendCode}</p>
            <p>Descrição do tipo: {nameDescription}</p>
          </div>
        )
      })}

    </div>
  );
};

export default SearchResultsList;