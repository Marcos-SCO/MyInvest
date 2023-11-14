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

const API_BASE_URL = process.env.API_BASE_URL;

export default async function Page({ params }) {
  const { assetType, ticker } = params;

  const session = await getServerSession(nextAuthOptions);

  const { userId } = await getUserSessionData(session);

  const assetFetch = await getAssetData(params);
  const assetError = assetFetch?.errorData;

  if (assetError) {
    const errorMessage = assetError?.error;

    notFound();
  }

  const assetItem = assetFetch?.props?.asset;

  const { id: assetId, name, type } = assetItem;
  const assetDetailList = assetItem.AssetDetailList;

  if (!assetDetailList) return;

  const assetDetail = assetDetailList[0];
  const symbols = assetDetail?.symbols;
  const currentPrice = formatCurrency(assetDetail?.currentPrice);
  const currentDividend = assetDetail?.currentDividend;
  const historicalData = assetDetail?.historicalData;

  const parsedData = JSON.parse(historicalData);

  const parsedHistoricalData =
    parsedData?.results[0];

  const assetLogoUrl = parsedHistoricalData?.logourl
    ?? 'https://brapi.dev/favicon.svg';

  const assetLongName =
    parsedHistoricalData?.longName;

  const assetShortName =
    parsedHistoricalData?.shortName;

  const historicalDataPrice =
    parsedHistoricalData?.historicalDataPrice;

  const fiftyTwoWeekLow =
    parsedHistoricalData?.fiftyTwoWeekLow;

  const fiftyTwoWeekHigh =
    parsedHistoricalData?.fiftyTwoWeekHigh;

  return (
    <div className=''>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">

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
  )
}
