import AssetModel from "../Assets/models/AssetModel";
import AssetNasdaq from "../Assets/models/AssetNasdaq";
import AssetUpdatesQueue from "./AssetUpdatesQueue";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function AssetUpdatesExecuteQueue(page = 1, processedCount = 0) {
  const assetQueuesPageResults =
    await AssetUpdatesQueue().getAssetIds(page);

  if (!assetQueuesPageResults) return;

  const { resultsLength, assetResults, totalPages, totalAssetsCount } = assetQueuesPageResults;
  // console.log(assetQueuesPageResults);

  if (!assetResults) return;

  let currentProcessedCount = processedCount;

  const isFirstPage = page == 1;
  if (isFirstPage) console.log(`\n Assets Queue process start: Page ${page}\n`);

  for (let i = 0; i < resultsLength; i++) {
    let assetTicker = assetResults[i]?.name;
    let assetType = assetResults[i]?.type;

    const updateObj = { ticker: assetTicker, type: assetType }

    const isNasdaq = assetType == 2;

    const assetDetails = isNasdaq ?
      await AssetNasdaq().updateAsset(updateObj) :
      await AssetModel().updateAsset(updateObj);

    if (!assetDetails) continue;

    const { id: assetId, createdAt, updatedAt } = assetDetails;

    currentProcessedCount++;

    console.log(`${i + 1}: ${currentProcessedCount} - ${assetTicker} | Updated at ${updatedAt}\n`);
  }

  const lastPageReached = page == totalPages;

  if (lastPageReached) {
    console.log(`All ${totalAssetsCount} assets data have been updated ✔\n`);
    return;
  }

  const nextPage = page + 1;

  console.log(`Now it'll process page ${nextPage}\n`);

  sleep(3000);

  await AssetUpdatesExecuteQueue(nextPage, currentProcessedCount);

}

export { AssetUpdatesExecuteQueue, sleep };