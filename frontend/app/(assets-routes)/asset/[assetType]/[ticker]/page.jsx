import dynamic from 'next/dynamic';

import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Image from "next/image";
import { notFound } from "next/navigation";
import { getUserSessionData } from "../../../../helpers/session/getUserSessionData";

import { getAssetData } from "../../../../api/assets/getAssetData";

import { formatCurrency } from "../../../../helpers/assets";
import { ZoomableTimeSeriesChart } from '../../charts/ZoomableTimeSeriesChart';

import AddPriceAlert from "../../../../../components/alerts/AddPriceAlert";

import AssetFavButton from "../../../../../components/assets/assetButtons/assetFavButton/layout";

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

import ModalContainer from '../../../../../components/modal/ModalContainer';

import OpenPriceAlertModal from '../../../../../components/assets/assetButtons/assetPriceAlert/OpenPriceAlertModal';
import OpenModalContainer from '../../../../../components/modal/OpenModalHandler';

import UserAssetsButton from '../../../../../components/assets/assetButtons/UserAssetsButton';

import SymbolsBr from '../../../../../components/assets/SymbolsBr';
import SymbolsUs from '../../../../../components/assets/SymbolsUs';

import DisplaySvg from '../../../../helpers/svg/DisplaySvg';

export const metadata = {}

export default async function Page({ params, onLoad }) {
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
  const symbols = assetDetail ? JSON.parse(assetDetail?.symbols) : undefined;

  const currentPrice = formatCurrency(assetDetail?.currentPrice);

  const currentDividend = assetDetail?.currentDividend;
  const historicalData = assetDetail?.historicalData;

  const parsedData = historicalData
    ? JSON.parse(historicalData) : undefined;

  const parsedHistoricalData =
    parsedData?.results?.[0];

  const assetLogoUrl = parsedHistoricalData?.logourl
    ?? 'https://brapi.dev/favicon.svg';

  const assetLongName =
    parsedHistoricalData?.longName ?? ticker;

  const assetShortName =
    parsedHistoricalData?.shortName;

  const historicalDataPrice =
    parsedHistoricalData?.historicalDataPrice;

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

        <div className='asset-page-container'>

          <div className="flex flex-1 flex-col justify-center py-12">

            <h1 className='asset-title'>{ticker}</h1>

            <div className='side-buttons'>
              <UserAssetsButton userId={userId} />

              <OpenPriceAlertModal userId={userId} />
            </div>

            {<AssetFavButton assetId={assetId} userId={userId} />}

            <figure>
              <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading="eager" />

              <figcaption>
                <p>{assetLongName}</p>
                <p><strong>Ticker</strong>: {ticker}</p>
                <p><strong>Preço Atual</strong>: {currentPrice}</p>
              </figcaption>
            </figure>

            {symbols && type && type != 2 && <SymbolsBr symbols={symbols} />}

            {symbols && type && type == 2 && <SymbolsUs symbols={symbols} />}


            {historicalDataPrice && <ZoomableTimeSeriesChart objData={historicalDataPrice} assetType={type} assetTicker={ticker} />}

            {<HashClickAfterLoading />}

          </div>
        </div >
      </main>
    </>
  )
}
