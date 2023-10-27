const API_BASE_URL = process.env.API_BASE_URL;

async function fetchUserAssets(fetchObj) {
  const { id, numberOfItens = 10, page = 1 } = fetchObj;

  const backendUrl = `${API_BASE_URL}/assets/user/paginate/`;

  const bodyObj = {
    "userId": id,
    numberOfItens,
    page
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
    if (isMissing) {
      throw new Error(data.message);
    }

    return data;

  } catch (error) {
    console.log('Fetch error: ', error.message);
    return {
      error: true,
      message: error.message,
    }
  }
}

export { fetchUserAssets }