const API_BASE_URL = process.env.API_BASE_URL;

async function fetchTopListAssets(assetsType = 1) {
  const backendUrl =
    `${API_BASE_URL}/topAssets/${assetsType}`;

  const config = {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    next: {
      revalidate: 0
    }
  }

  try {
    const fetchResults = await fetch(backendUrl, config);
    const res = await fetchResults.json();
    const data = res;

    return data;

  } catch (error) {
    console.error('fetchTopListAssets error: ', error.message);
  }

}

export default fetchTopListAssets;