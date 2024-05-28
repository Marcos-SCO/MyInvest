import AsyncLocalStorage from '@createnextapp/async-local-storage';

const isLocalStorageAvailable =
  (typeof window !== 'undefined' && window.localStorage);

async function getUserAssetsLocalStorage() {
  if (!isLocalStorageAvailable) return [];

  // const userAssetsString = localStorage.getItem('userAssets');
  const userAssetsString = await AsyncLocalStorage.getItem('userAssets');
  
  const userAssets = userAssetsString ? JSON.parse(userAssetsString) : {};

  return userAssets;
}

async function userHasAssetInLocalStorage(assetId) {
  const userAssets = await getUserAssetsLocalStorage();
  return userAssets[assetId];
}

async function setLocalStorageUserAsset(assetId, isUserAsset = false) {
  if (!isLocalStorageAvailable) return;

  const userAssets = await getUserAssetsLocalStorage();
  userAssets[assetId] = { isUserAsset: isUserAsset };

  // localStorage.setItem('userAssets', JSON.stringify(userAssets));

  await AsyncLocalStorage.setItem('userAssets', JSON.stringify(userAssets));
}

async function removeLocalStorageItem(itemName) {
  if (!isLocalStorageAvailable) return;
  // localStorage.removeItem(itemName);
  await AsyncLocalStorage.removeItem(itemName);
}

export { getUserAssetsLocalStorage, userHasAssetInLocalStorage, setLocalStorageUserAsset, removeLocalStorageItem }