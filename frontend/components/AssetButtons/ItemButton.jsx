'use client';

import { userCreateAsset } from 'app/api/assets/userAssets/userAddAsset';
import { userRemoveAsset } from 'app/api/assets/userAssets/userRemoveAsset';
import React, { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";

export default function ItemButton({ isUserAsset, fetchObj }) {
  const router = useRouter();

  const userAssetInitialValue = isUserAsset;
  const [userAsset, setUserAsset] = useState(userAssetInitialValue);

  async function handleAsset(e) {
    if (!userAsset) {
      await userCreateAsset(fetchObj);
      setUserAsset(true);

      router.refresh(); 
      // Use refresh to request the data from the backend without cashing

      return;
    }

    const removeUserAsset = await userRemoveAsset(fetchObj);
    // console.log(removeUserAsset);

    setUserAsset(false);

    const closestAssetContainer =
      e.target.closest('[data-js="asset-container"]');

    if (closestAssetContainer) {
      closestAssetContainer.style = 'display:none';
    }

    router.refresh();
  }

  return (
    <button onClick={handleAsset} className="p-2 w-40 border border-gray-300 rounded-md mb-2">
      {!userAsset ? 'Favoritar' : 'Remover dos favoritos'}
    </button>
  );
}
