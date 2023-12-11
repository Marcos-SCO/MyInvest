// 'use client';

import { getBackendAssetType } from 'app/api/assets/helpers/assetHelpers';

import { useRouter } from "next/navigation";

import Link from "next/link";

const baseUrl = process.env.FRONT_END_BASE_URL;

import { useModal } from '../../app/providers/modalProviders';
import { formatCurrency, getAssetTypeDescription, getFormatToInsertPrice } from '../../app/helpers/assets';
import PercentageVariation from '../assets/symbols/PercentageVariation';

function SearchResultsList({ results }) {

  const { closeModalHandler } = useModal();

  const router = useRouter();

  function handleAssetPage(e, ticker, slugType) {
    const mouseLeftButton = e.button === 0;
    if (!mouseLeftButton) return;

    const assetPageUrl = `/asset/${slugType}/${ticker}`;

    router.push(assetPageUrl);
  }

  const isThereSearchResults = results?.length;

  const isDisplayingResults =
    isThereSearchResults ? ' display-results' : '';

  const feedBackMessage = results?.[0]?.feedback;

  return (
    <>
      {feedBackMessage && <div className={`results-list display-results`}>
        <p>{feedBackMessage}</p>
      </div>}

      {!feedBackMessage && <div className={`results-list${isDisplayingResults}`}>
        {results.map((result, id) => {
          const resultType = result.type;
          const resultName = result.name;
          const resultCode = result.code;

          console.log(result)

          const { backendCode, typeSlug } =
            getBackendAssetType(resultType);

          const assetPageUrl =
            `${baseUrl}/asset/${typeSlug}/${resultCode}`;

          const typeObj = getAssetTypeDescription(backendCode);
          const typeNameDescription = typeObj?.nameDescription;

          const priceCurrency = backendCode == 2 ? 'usd' : 'brl';
          const formattedPrice = getFormatToInsertPrice(result?.price);

          const priceItem = formatCurrency(formattedPrice, priceCurrency);

          return (
            <Link href={assetPageUrl} key={id} onClick={() => closeModalHandler('search-bar')}>
              <div className="search-results">
                <div className='item-description'>
                  <p>{resultName} - {resultCode}</p>
                  <small className='type-description'>{resultCode} - {typeNameDescription}</small>
                  <div className='price-description'>
                    <p className='current-price'>{priceItem}</p>
                    {<PercentageVariation symbols={result} />}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>}

      {!feedBackMessage && !isThereSearchResults && <div className={`results-list display-results`}>
        <p>Pesquise por tickers ou nome de ativos</p>
      </div>}

    </>
  );
};

export default SearchResultsList;