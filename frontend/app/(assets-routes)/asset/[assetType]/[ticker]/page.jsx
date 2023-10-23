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

export default async function Page({ params }) {
  const { assetType, ticker } = params;

  const assetFetch = await getServerSideProps(params);
  const assetError = assetFetch?.errorData;

  if (assetError) {
    const errorMessage = assetError?.error;

    return (
      <div className='grid place-items-center h-screen -mt-24'>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <p><strong>Message</strong>: {errorMessage}</p>

        </div>
      </div>
    );

  }

  const assetItem = assetFetch?.props?.asset;


  const { id, name, type, AssetDetailList } = assetItem;

  const { symbols, currentDividend, historicalDividends } = AssetDetailList?.[0];

  return (
    <div className='grid place-items-center h-screen -mt-24'>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <p><strong>Ticker</strong>: {ticker}</p>
        <p><strong>Dividendo Atual</strong>: {currentDividend}</p>
        <br />
        <p style={{ width: "100%", maxHeight: "200px", overflowY: "hidden" }}><strong>Symbols</strong> : {symbols}</p>
        <br />
        <p style={{ width: "100%", maxHeight: "200px", overflowY: "hidden" }}><strong>Histórico de dividendos</strong> : {historicalDividends}</p>

      </div>
    </div >
  )
}
