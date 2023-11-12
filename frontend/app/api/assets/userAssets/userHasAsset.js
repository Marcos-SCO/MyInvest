const API_BASE_URL = process.env.API_BASE_URL;

async function userHasAsset(fetchObj) {
  const { userId, assetId } = fetchObj;

  const backendUrl = `${API_BASE_URL}/verify/user/asset/`;

  const bodyObj = {
    userId,
    assetId,
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
      haveAsset: true,
      data
    };

  } catch (error) {
    // console.log('Message:', error.message);

    return {
      haveAsset: false,
      message: error.message,
    }
  }
}

export { userHasAsset }