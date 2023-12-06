import AssetModel from "../Assets/models/AssetModel";
import PriceAssetsWatchModel from "../Assets/models/PriceAssetsWatchModel";

const PriceAlertEmailsQueue = () => {

  async function getPriceAlertAssets(page: Number) {

    const numberOfItens = 5;
    const orderBy = 'asc';

    const searchByStatus = false;
    const active = true;

    const searchObj: any = {
      page,
      numberOfItens,
      orderBy: { 'id': orderBy }
    }

    if (searchByStatus) searchObj.where = { ...searchObj.where, active: active }

    try {

      const assetsQuery: any = await PriceAssetsWatchModel().getAllByPagination(searchObj);

      const { totalPages, totalAlertsCount, priceAlertResults } = assetsQuery;

      const resultsLength = priceAlertResults?.length;

      const queryResults = resultsLength > 0;
      if (!queryResults) throw new Error('No Price assets found');

      return {
        totalPages,
        totalAlertsCount,
        priceAlertResults,
        resultsLength
      };

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return { getPriceAlertAssets }

}

export default PriceAlertEmailsQueue;