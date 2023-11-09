import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

import AssetFavButton from "components/AssetButtons/layout";
import { formatCurrency } from "../../../../helpers/assets";

const API_BASE_URL = process.env.API_BASE_URL;

async function getServerSideProps(params) {
  const { assetType, ticker } = params;

  const backendUrl = `${API_BASE_URL}/assets/${assetType}/${ticker}/`;
  const config = {
    method: 'GET',
    Headers: { 'Content-type': 'application/json' }
  }

  const res = await fetch(backendUrl, config);

  const isErrorRequest = !res.ok || res.status == 404;

  if (isErrorRequest) {
    console.log(backendUrl);
    const errorData = await res.json();

    // const errorMessage = JSON.stringify(errorData);
    const errorMessage = errorData;

    return { errorData: errorMessage };
  }

  const data = await res.json();

  return {
    props: data,
  };

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

  // console.log(JSON.parse(historicalData));

  return (
    <div className='grid place-items-center'>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        {userId && <>
          <AssetFavButton assetId={assetId} userId={userId} />

          <a href="/user/assets" className="my-3">Acessar meus ativos</a>
        </>}

        <p><strong>Ticker</strong>: {ticker}</p>
        <p><strong>Preço Atual</strong>: {currentPrice}</p>
        <br />
        <p style={{ width: "100%", maxHeight: "200px", overflowY: "hidden" }}><strong>Symbols</strong> : {symbols}</p>
        <br />
        <p style={{ width: "100%", maxHeight: "200px", overflowY: "hidden" }}><strong>Históricos</strong> : {historicalData}</p>

      </div>
    </div >
  )
}
