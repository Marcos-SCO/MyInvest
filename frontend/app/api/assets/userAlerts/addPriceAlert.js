const API_BASE_URL = process.env.API_BASE_URL;

async function addPriceAlert(fetchObj) {
  const { userId, assetId, expectedPrice, priceAlertType } = fetchObj;

  const backendUrl = `${API_BASE_URL}/assets/price/watch/`;

  const bodyObj = {
    userId,
    assetId,
    expectedPrice,
    priceAlertType
  };

  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(bodyObj),
  }

  try {
    const fetchResults = await fetch(backendUrl, config);

    const res = await fetchResults.json();
    const data = res;

    const isMissing = fetchResults.status == 404;
    if (isMissing) throw new Error(data.message);

    return {
      assetCreated: true,
      data
    };

  } catch (error) {
    console.error('UserAddAsset: ', error.message);
    return {
      assetCreated: false,
      message: error.message,
    }
  }
}

export { addPriceAlert }