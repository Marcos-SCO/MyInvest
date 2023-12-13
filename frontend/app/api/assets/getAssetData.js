const API_BASE_URL = process.env.API_BASE_URL;

export async function getAssetData(params) {
  const { assetType, ticker } = params;

  const backendUrl = `${API_BASE_URL}/assets/${assetType}/${ticker}/`;
  const config = {
    method: 'GET',
    Headers: {
      'Content-type': 'application/json',
      'Connection': 'keep-alive'
    },
    next: {
      revalidate: 0
    }
  }

  try {
    const res = await fetch(backendUrl, config);

    const isErrorRequest = !res.ok || res.status == 404;

    if (isErrorRequest) {
      // console.log(backendUrl);
      const errorData = await res.json();

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