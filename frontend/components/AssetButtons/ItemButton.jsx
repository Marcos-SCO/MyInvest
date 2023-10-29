'use client';

import { userCreateAsset } from '@/app/api/assets/userAssets/userAddAsset';
import { userHasAsset } from '@/app/api/assets/userAssets/userHasAsset'
import { userRemoveAsset } from '@/app/api/assets/userAssets/userRemoveAsset';
import React, { useEffect, useState } from 'react';

export default function ItemButton({ isUserAsset, fetchObj }) {
  const userAssetInitialValue = isUserAsset;

  const [userAsset, setUserAsset] = useState(userAssetInitialValue);

  async function handleAsset(e) {
    if (!userAsset) {
      await userCreateAsset(fetchObj);
      setUserAsset(true);
      return;
    }

    const removeUserAsset = await userRemoveAsset(fetchObj);
    console.log(removeUserAsset);

    setUserAsset(false);

    const closestAssetContainer =
      e.target.closest('[data-js="asset-container"]');

    if (closestAssetContainer) {
      closestAssetContainer.style = "display:none";
    }

  }

  return (
    <button onClick={handleAsset} className="p-2 w-40 border border-gray-300 rounded-md mb-2">
      {!userAsset ? 'Favoritar' : 'Remover dos favoritos'}
    </button>
  )
}
