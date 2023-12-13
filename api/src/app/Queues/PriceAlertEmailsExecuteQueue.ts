import AssetModel from "../Assets/models/AssetModel";
import AssetNasdaq from "../Assets/models/AssetNasdaq";
import PriceAssetsWatchModel from "../Assets/models/PriceAssetsWatchModel";
import AssetUpdatesQueue from "./AssetUpdatesQueue";
import PriceAlertEmailsQueue from "./PriceAlertEmailsQueue";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function PriceAlertEmailsExecuteQueue(page = 1, processedCount = 0) {

  const priceAlertQueuesPageResults =
    await PriceAlertEmailsQueue().getPriceAlertAssets(page);

  if (!priceAlertQueuesPageResults) return;

  const { resultsLength, priceAlertResults, totalPages, totalAlertsCount } = priceAlertQueuesPageResults;
  // console.log(priceAlertQueuesPageResults);

  if (!priceAlertResults) return;

  let currentProcessedCount = processedCount;

  const isFirstPage = page == 1;
  if (isFirstPage) console.log(`\n Price alerts Queue process start: Page ${page}\n`);

  const disconnect = page == (totalPages - 1) ? true : false;

  for (let i = 0; i < resultsLength; i++) {
    let priceAlertId = priceAlertResults[i]?.id;

    let assetId = priceAlertResults[i]?.assetId;
    let userId = priceAlertResults[i]?.userId;

    let expectedPrice = priceAlertResults[i]?.expectedPrice;
    let priceAlertTypeId = priceAlertResults[i]?.priceAlertTypeId;

    const reachedPriceObj = { priceAlertId, assetId, userId, expectedPrice, priceAlertTypeId };

    const assetReachedExpectedPrice = await PriceAssetsWatchModel().assetReachedExpectedPrice(reachedPriceObj);

    if (!assetReachedExpectedPrice) {
      console.log(`Alert ${priceAlertId} didn't reach expected price \n`);

      try {
        const updateAlert = await PriceAssetsWatchModel()
          .updatePriceAlert({ alertId: priceAlertId, active: true });

        // console.log('Update alert: ', updateAlert);

      } catch (error) {

        console.log('Update error alert: ', error);
      }

      sleep(1000);
      continue;
    }

    currentProcessedCount++;

    console.log(`Alert ${priceAlertId} reach expected price \n`, assetReachedExpectedPrice);
    try {
      const updateDelete = await PriceAssetsWatchModel()
        .updatePriceAlert({ alertId: priceAlertId, active: false }, disconnect);

    } catch (error) {

      console.log('Soft delete error: ', error);
    }

    sleep(1000);

    console.log(`${i + 1}: ${currentProcessedCount}\n`);
  }

  const lastPageReached = page == totalPages;

  if (lastPageReached) {
    console.log(`All ${totalAlertsCount} price alerts data have been updated ✔\n`);
    return;
  }

  const nextPage = page + 1;

  console.log(`Now it'll process page ${nextPage}\n`);

  sleep(3000);

  await PriceAlertEmailsExecuteQueue(nextPage, currentProcessedCount);

}

export { PriceAlertEmailsExecuteQueue, sleep };