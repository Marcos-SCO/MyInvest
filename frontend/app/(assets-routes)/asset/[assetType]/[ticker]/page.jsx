import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from 'next/link';

import { notFound } from "next/navigation";
import { getUserSessionData } from "../../../../helpers/session/getUserSessionData";

import { getAssetData } from "../../../../api/assets/getAssetData";

import { formatCurrency, getAssetTypeDescription } from "../../../../helpers/assets";
import { ZoomableTimeSeriesChart } from '../../charts/ZoomableTimeSeriesChart';

import AddPriceAlert from "../../../../../components/alerts/AddPriceAlert";

// import AssetFavButton from "../../../../../components/assets/assetButtons/assetFavButton/layout";

// import DisplaySvg from '../../../../helpers/svg/DisplaySvg';

const AssetFavButton =
  dynamic(() => import('../../../../../components/assets/assetButtons/assetFavButton/layout'), { ssr: false });

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

import ModalContainer from '../../../../../components/modal/ModalContainer';

import OpenPriceAlertModal from '../../../../../components/assets/assetButtons/assetPriceAlert/OpenPriceAlertModal';
import OpenModalContainer from '../../../../../components/modal/OpenModalHandler';

import UserAssetsButton from '../../../../../components/assets/assetButtons/UserAssetsButton';

import PercentageVariation from '../../../../../components/assets/symbols/PercentageVariation';

export const metadata = {}

export default async function Page({ params }) {
  const { assetType, ticker } = params;

  metadata.title = `MyInvest - ${ticker}`;

  const session = await getServerSession(nextAuthOptions);
  const { userId } = await getUserSessionData(session);

  const assetFetch = await getAssetData(params);
  const assetError = assetFetch?.errorData;

  if (assetError) {
    const errorMessage = assetError?.error;
    console.error('message to display:', errorMessage)
    return notFound();
  }

  const assetItem = assetFetch?.props?.asset;

  const { id: assetId, name, type } = assetItem;
  const assetDetailList = assetItem.AssetDetailList;

  if (!assetDetailList) notFound();

  const assetDetail = assetDetailList[0];
  const symbols = assetDetail
    ? JSON.parse(assetDetail?.symbols) : undefined;

  const assetTypeDescription = getAssetTypeDescription(type);
  const currencyName = assetTypeDescription?.currencyName;
  const nameDescription = assetTypeDescription?.nameDescription;

  const assetCurrentPriceValue = type == 2
    ? `$` + assetDetail?.currentPrice : assetDetail?.currentPrice;

  const currentPrice = formatCurrency(assetCurrentPriceValue);

  const historicalData = assetDetail?.historicalData;

  const parsedData = historicalData
    ? JSON.parse(historicalData) : undefined;

  const requestedAt = parsedData?.requestedAt;
  const requestAtDate = requestedAt ?
    new Date(requestedAt).toLocaleDateString('pt-BR') : false;

  const parsedHistoricalData =
    parsedData?.results?.[0];

  const assetLogoUrl = parsedHistoricalData?.logourl
    ?? 'https://brapi.dev/favicon.svg';

  const assetLongName =
    parsedHistoricalData?.longName ?? ticker;

  const historicalDataPrice =
    parsedHistoricalData?.historicalDataPrice;

  const assetShortName =
    parsedHistoricalData?.shortName;

  const fiftyTwoWeekLow =
    parsedHistoricalData?.fiftyTwoWeekLow;

  const fiftyTwoWeekHigh =
    parsedHistoricalData?.fiftyTwoWeekHigh;

  const previousClose =
    parsedHistoricalData?.regularMarketPreviousClose;

  const HashClickAfterLoading =
    dynamic(() => import('./HashClickAfterLoading'), { ssr: false });

  return (
    <>
      <ChangePageAttributes pageName="asset" />

      {userId && <ModalContainer modalId={'priceAlert'} modalTitle="Alerta de ativos">
        <AddPriceAlert sessionProp={session} assetId={assetId} assetTicker={ticker} assetCurrentPrice={currentPrice} assetType={type} />
      </ModalContainer>}

      <main className='main-container'>

        <div className='asset-page-container py-12'>

          <div className='asset-page-header'>

            <div className='asset-header'>
              <div className='caption-title'>
                <div className='inner-title-container'>
                  <h1 className='asset-title'>{assetLongName} ({ticker})</h1>
                  <small>Apresentação de valores diários em Moeda - {currencyName}</small>
                </div>
                {<AssetFavButton assetId={assetId} userId={userId} />}
              </div>

              <div className='asset-info-details'>
                <figure>
                  <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading="eager" />
                  <figcaption>
                    <p>{ticker}</p>
                    <small>{nameDescription}</small>
                    <small>{assetLongName}</small>
                  </figcaption>
                </figure>

                <div className='price-description'>
                  <div className='description-header'>
                    <Link href="#historical-price-data">
                      <p className='current-price'>{currentPrice}</p>
                    </Link>
                    <Link href="#historical-price-data">
                      {<PercentageVariation symbols={symbols} />}
                    </Link>
                  </div>
                  {requestedAt &&
                    <small>
                      {<p>Atualizado em {requestAtDate}</p>}
                    </small>}
                </div>

              </div>

            </div>

            <div className='side-buttons'>
              <OpenPriceAlertModal userId={userId} />
              <UserAssetsButton userId={userId} />
            </div>

          </div>

          {historicalDataPrice &&
            <div className='historical-graph-container'>
              <ZoomableTimeSeriesChart objData={historicalDataPrice} assetType={type} assetTicker={ticker} />
            </div>
          }

          {!historicalDataPrice &&
            <div className='historical-graph-container no-data-graph'>
              <span className='not-found-text'>Não foi encontrado registros históricos para esse ativo :(</span>
              <ZoomableTimeSeriesChart objData={[{ date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0, adjustedClose: 0 }]} assetType={type} assetTicker={ticker} />
            </div>
          }

          {<HashClickAfterLoading />}

        </div>
      </main>
    </>
  )
}
