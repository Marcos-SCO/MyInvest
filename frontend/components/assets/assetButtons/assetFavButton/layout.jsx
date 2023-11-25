import React from 'react';

import { userHasAsset } from 'app/api/assets/userAssets/userHasAsset';

import ItemButton from './ItemButton';

import OpenModalContainer from '../../../modal/OpenModalHandler';
import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

export default async function AssetFavButton({ userId = false, assetId = false }) {
  
  if (!userId) {
    return (<OpenModalContainer modalId={`authContainer`} className={'followAssetButton blue'}>
      <DisplaySvg name="plusSign" width="18" height="18" /> Seguir
    </OpenModalContainer>)
  }

  const fetchObj = { assetId, userId };

  const userAsset = await userHasAsset(fetchObj);
  const isUserAsset = userAsset?.haveAsset;

  return (
    <>
      <ItemButton isUserAsset={isUserAsset} fetchObj={fetchObj} />
    </>
  )

}