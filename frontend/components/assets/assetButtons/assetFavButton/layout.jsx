'use client';

import React from 'react';

import { userHasAsset } from 'app/api/assets/userAssets/userHasAsset';

import ItemButton from './ItemButton';

import OpenModalContainer from '../../../modal/OpenModalHandler';
import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

import { setLocalStorageUserAsset, userHasAssetInLocalStorage } from '../../../../app/helpers/localstorage/assetsLocalStorage';

export default async function AssetFavButton({ userId = false, assetId = false, removeItem = true }) {

  const fetchObj = { assetId, userId };

  let isUserAsset = false;

  if (userId) {

    let assetInLocalStorage =
      userHasAssetInLocalStorage(assetId);

    isUserAsset = assetInLocalStorage?.isUserAsset;

    if (!assetInLocalStorage) {

      const userAsset = await userHasAsset(fetchObj);
      isUserAsset = userAsset?.haveAsset;

      setLocalStorageUserAsset(assetId, isUserAsset);
    }

  }

  if (!userId) {
    return (<OpenModalContainer modalId={`authContainer`} className={'followAssetButton blue'}>
      <DisplaySvg name="plusSign" width="18" height="18" /> Seguir
    </OpenModalContainer>)
  }

  return (
    <>
      <ItemButton isUserAsset={isUserAsset} fetchObj={fetchObj} removeItem={removeItem} />
    </>
  )

}