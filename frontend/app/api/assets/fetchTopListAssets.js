const API_BASE_URL = process.env.API_BASE_URL;

async function fetchTopListAssets(assetsType = 1) {
  const backendUrl = `${API_BASE_URL}/topAssets/`;

  const bodyObj = { assetListTypeId: assetsType };

  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(bodyObj),
    next: {
      revalidate: 60
    }
  }

  try {
    const fetchResults = await fetch(backendUrl, config);
    const res = await fetchResults.json();
    const data = res;

       // console.log('filtered: ', fetchResults);
    return data;

  } catch (error) {
    console.error('fetchTopListAssets error: ', error.message);
  }

}

export default fetchTopListAssets;