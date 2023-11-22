import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Image from "next/image";
import { formatCurrency } from "../../../../helpers/assets";

import { ZoomableTimeSeriesChart } from '../../charts/ZoomableTimeSeriesChart';

import UserAssetButtons from './UserAssetButtons';
import { notFound } from "next/navigation";
import { getUserSessionData } from "../../../../helpers/session/getUserSessionData";
import AddPriceAlert from "../../../../../components/alerts/AddPriceAlert";
import { getAssetData } from "../../../../api/assets/getAssetData";

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

const API_BASE_URL = process.env.API_BASE_URL;

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
  const symbols = assetDetail?.symbols;

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

  return (
    <>
      <main className='main-container'>
        <ChangePageAttributes pageName="asset" />

        <div className='asset-page-container'>

          <div className="flex flex-1 flex-col justify-center py-12">

            <AddPriceAlert sessionProp={session} assetId={assetId} assetTicker={ticker} assetCurrentPrice={currentPrice} />

            {userId && <UserAssetButtons assetId={assetId} userId={userId} />}

            <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading="eager" />

            <p>{assetLongName}</p>
            <p><strong>Ticker</strong>: {ticker}</p>
            <p><strong>Preço Atual</strong>: {currentPrice}</p>


            <br />

            {historicalDataPrice && <ZoomableTimeSeriesChart objData={historicalDataPrice} assetType={type} />}

          </div>
        </div >
      </main>
    </>
  )
}
