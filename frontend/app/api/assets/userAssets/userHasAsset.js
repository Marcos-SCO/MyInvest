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
    next: {
      revalidate: 0
    }
  }

  try {
    const fetchResults = await fetch(backendUrl, config);

    const res = await fetchResults.json();
    const data = res;

    const isMissing = fetchResults.status == 404;
    if (isMissing) throw new Error(data.message);

    return {
      haveAsset: data?.userHasAsset,
      data
    };

  } catch (error) {
    // console.log('Message:', error.message);

    return {
      haveAsset: false,
      userHasAsset: false,
      message: error.message,
    }
  }
}

export { userHasAsset }