const API_BASE_URL = process.env.API_BASE_URL;

import { getAssetTypes } from './helpers/assetHelpers';

async function fetchAssets(value) {
  if (!value) return;

  const searchedValue = value?.toLowerCase();

  const tickerValue = value.toLowerCase();

  const backendUrl = `${API_BASE_URL}/assetsApiQuery/${tickerValue}/`;
  const config = {
    method: 'GET',
    Headers: { 'Content-type': 'application/json' },
    next: {
      revalidate: 60
    }
  }

  try {
    const fetchResults = await fetch(backendUrl, config);
    const res = await fetchResults.json();
    const data = res?.data;

    const filteredResults = data.filter((asset) => {

      const includeAssetValue = (searchedValue && asset.code)
        && asset.name.toLowerCase().includes(searchedValue)
        || asset.code.toLowerCase().includes(searchedValue);

      const includeBackendSupportedTypes = asset.type
        && [1, 12, 2].includes(asset.type);

      console.log('inc', searchedValue);

      return (includeAssetValue && includeBackendSupportedTypes);
    });

    // console.log('filtered: ', fetchResults);
    return filteredResults;

  } catch (error) {
    console.log('Fetch error: ', error.message);
  }

}

export default fetchAssets;