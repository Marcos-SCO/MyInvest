import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Link from "next/link";
import Image from "next/image";

import { formatCurrency } from "../../../../helpers/assets";

import { ZoomableTimeSeriesChart } from '../../charts/ZoomableTimeSeriesChart';

import UserAssetButtons from './UserAssetButtons';

const API_BASE_URL = process.env.API_BASE_URL;

async function getServerSideProps(params) {
  const { assetType, ticker } = params;

  const backendUrl = `${API_BASE_URL}/assets/${assetType}/${ticker}/`;
  const config = {
    method: 'GET',
    Headers: { 'Content-type': 'application/json' }
  }

  try {
    const res = await fetch(backendUrl, config);

    const isErrorRequest = !res.ok || res.status == 404;

    if (isErrorRequest) {
      console.log(backendUrl);
      const errorData = await res.json();

      // const errorMessage = JSON.stringify(errorData);
      const errorMessage = errorData;

      return {
        errorData: {
          error: `${ticker.toUpperCase()} não foi encontrado`
        }
      };
    }

    const data = await res.json();

    return {
      props: data,
    };

  } catch (error) {

    return {
      errorData: {
        error: 'Item não foi encontrado',
      }
    };
  }

}

function errorBlockMessage(errorMessage) {
  return (
    <div className='grid place-items-center h-screen -mt-24'>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <p><strong>Message</strong>: {errorMessage}</p>

      </div>
    </div>
  );
}

export default async function Page({ params }) {
  const { assetType, ticker } = params;

  const session = await getServerSession(nextAuthOptions);
  // console.log(session);

  const credentialSession = session?.user;

  // const { id: userSessionId } = ;
  const userSessionId =
    credentialSession ? credentialSession?.id : session?.id;

  const userId = session?.userId ?? userSessionId;

  const assetFetch = await getServerSideProps(params);
  const assetError = assetFetch?.errorData;

  if (assetError) {
    const errorMessage = assetError?.error;

    return errorBlockMessage(errorMessage);
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

  const parsedHistoricalData =
    (JSON.parse(historicalData))?.results[0];

  const assetLogoUrl =
    parsedHistoricalData?.logourl ?? 'https://brapi.dev/favicon.svg';

  const assetLongName =
    parsedHistoricalData?.longName;

  const assetShortName =
    parsedHistoricalData?.shortName;

  const historicalDataPrice =
    parsedHistoricalData?.historicalDataPrice;

  // console.log(historicalDataPrice);

  function setClick() {
    return console.log('olaaaa');
  }

  return (
    <div className=''>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        {userId && <UserAssetButtons assetId={assetId} userId={userId} />}

        <Image src={assetLogoUrl} width={50} height={50} alt={assetLongName} title={assetLongName} loading="eager" />

        <p>{assetLongName}</p>
        <p><strong>Ticker</strong>: {ticker}</p>
        <p><strong>Preço Atual</strong>: {currentPrice}</p>
        <br />
        <p style={{ width: "100%", maxWidth: "800px", maxHeight: "400px", overflowY: "hidden", paddingY: "1rem" }}><strong>Symbols</strong> : {symbols}</p>

        <br />

        {historicalDataPrice && <ZoomableTimeSeriesChart objData={historicalDataPrice} assetType={type} />}

      </div>
    </div >
  )
}
