import dynamic from 'next/dynamic';

import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Image from "next/image";
import { notFound } from "next/navigation";
import { getUserSessionData } from "../../../../helpers/session/getUserSessionData";

import { formatCurrency } from "../../../../helpers/assets";
import { ZoomableTimeSeriesChart } from '../../charts/ZoomableTimeSeriesChart';

import UserAssetButtons from './UserAssetButtons';

import AddPriceAlert from "../../../../../components/alerts/AddPriceAlert";

import { getAssetData } from "../../../../api/assets/getAssetData";

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

import OpenModalContainer from '../../../../../components/modal/OpenModalHandler';

import ModalContainer from '../../../../../components/modal/ModalContainer';

import AuthButtonsTemplate from '../../../../../components/page/AuthButtonsTemplate';

import AssetFavButton from "../../../../../components/assetButtons/layout";

import SymbolsBr from '../../../../../components/assets/SymbolsBr';
import SymbolsUs from '../../../../../components/assets/SymbolsUs';

const API_BASE_URL = process.env.API_BASE_URL;

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
      <main className='main-container'>

        <div className='asset-page-container'>

          <div className="flex flex-1 flex-col justify-center py-12">

            <h1 className='asset-title'>{ticker}</h1>

            {!userId && <ModalContainer modalId={'authContainer'} modalTitle="Faça login ou crie uma conta" className="authButtons-modal">
              <AuthButtonsTemplate templateTitle="É necessário ter uma conta para acessar a funcionalidade" />
            </ModalContainer>}

            {userId && <ModalContainer modalId={'priceAlert'} modalTitle="Alerta de ativos">
              <AddPriceAlert sessionProp={session} assetId={assetId} assetTicker={ticker} assetCurrentPrice={currentPrice} />
            </ModalContainer>}

            <div className='side-buttons'>
              {userId && <UserAssetButtons assetId={assetId} userId={userId} />}

              <OpenModalContainer className="priceAlertModalButton myButton white" modalId={userId ? `priceAlert` : 'authContainer'}>
                Definir Alerta de preço
              </OpenModalContainer>
            </div>

            {!userId && (
              <OpenModalContainer modalId={`authContainer`} className={'followAssetButton myButton white'}>
                Seguir
              </OpenModalContainer>
            )}

            {userId && <AssetFavButton assetId={assetId} userId={userId} />}

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


            {historicalDataPrice && <ZoomableTimeSeriesChart objData={historicalDataPrice} assetType={type} />}

            {<HashClickAfterLoading />}

          </div>
        </div >
      </main>
    </>
  )
}
