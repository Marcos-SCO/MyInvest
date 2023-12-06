import AssetModel from "../Assets/models/AssetModel";

const AssetUpdatesQueue = () => {

  async function getAssetIds(page: Number) {

    const numberOfItens = 5;
    const getDetailedList = false;
    const orderBy = 'asc';

    try {

      const assetsQuery: any = await AssetModel().getAllAssetsByPagination({
        page,
        numberOfItens,
        getDetailedList,
        orderBy: { 'id': orderBy }
      });

      const { totalPages, totalAssetsCount, assetResults } = assetsQuery;

      const resultsLength = assetResults?.length;

      const queryResults = resultsLength > 0;
      if (!queryResults) throw new Error('No results were found');

      return {
        totalPages,
        totalAssetsCount,
        assetResults,
        resultsLength
      };

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return { getAssetIds }

}

export default AssetUpdatesQueue;