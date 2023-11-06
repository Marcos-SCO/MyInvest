import AssetModel from "../Assets/models/AssetModel";
import AssetNasdaq from "../Assets/models/AssetNasdaq";
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

  for (let i = 0; i < resultsLength; i++) {
    let priceAlertId = priceAlertResults[i]?.id;
    let assetId = priceAlertResults[i]?.id;
    let userId = priceAlertResults[i]?.type;
    let expectedPrice = priceAlertResults[i]?.expectedPrice;

    const updateObj = { priceAlertId, assetId, userId, expectedPrice };

    currentProcessedCount++;

    // console.log(`${i + 1}: ${currentProcessedCount} - ${assetTicker} | Updated at ${updatedAt}\n`);
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