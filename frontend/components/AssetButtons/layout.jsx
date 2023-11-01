import React from 'react';

import { userHasAsset } from 'app/api/assets/userAssets/userHasAsset';

import ItemButton from './ItemButton';

export default async function AssetFavButton({ assetId, userId }) {

  const fetchObj = { assetId, userId };

  const userAsset = await userHasAsset(fetchObj);
  const isUserAsset = userAsset?.haveAsset;

  return (
    <>
      <ItemButton isUserAsset={isUserAsset} fetchObj={fetchObj} />
    </>
  )

}