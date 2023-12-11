const isLocalStorageAvailable =
  (typeof window !== 'undefined' && window.localStorage);

function getUserAssetsLocalStorage() {
  if (!isLocalStorageAvailable) return [];

  const userAssetsString = localStorage.getItem('userAssets');
  const userAssets = userAssetsString ? JSON.parse(userAssetsString) : {};

  return userAssets;
}

function userHasAssetInLocalStorage(assetId) {
  const userAssets = getUserAssetsLocalStorage();
  return userAssets[assetId];
}

function setLocalStorageUserAsset(assetId, isUserAsset = false) {
  if (!isLocalStorageAvailable) return;

  const userAssets = getUserAssetsLocalStorage();
  userAssets[assetId] = { isUserAsset: isUserAsset };

  localStorage.setItem('userAssets', JSON.stringify(userAssets));
}

export { getUserAssetsLocalStorage, userHasAssetInLocalStorage, setLocalStorageUserAsset }