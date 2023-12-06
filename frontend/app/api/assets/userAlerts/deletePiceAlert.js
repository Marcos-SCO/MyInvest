const API_BASE_URL = process.env.API_BASE_URL;

async function deletePriceAlert(fetchObj) {
  const { userId, alertId, token = '' } = fetchObj;

  const backendUrl = `${API_BASE_URL}/assets/price/watch/`;

  const bodyObj = {
    userId,
    alertId,
    token
  };

  const config = {
    method: 'DELETE',
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
    console.error('Delete price alert: ', error.message);
    return {
      assetDeleted: false,
      message: error.message,
    }
  }
}

export { deletePriceAlert }