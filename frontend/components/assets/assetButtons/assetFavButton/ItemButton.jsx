'use client';

import { userCreateAsset } from 'app/api/assets/userAssets/userAddAsset';
import { userRemoveAsset } from 'app/api/assets/userAssets/userRemoveAsset';
import React, { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";
import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

export default function ItemButton({ isUserAsset, fetchObj }) {
  const router = useRouter();

  const userAssetInitialValue = isUserAsset;
  const [userAsset, setUserAsset] = useState(userAssetInitialValue);

  async function handleAsset(e) {
    if (!userAsset) {
      await userCreateAsset(fetchObj);
      setUserAsset(true);

      // Use refresh to request the data from the backend without cashing
      router.refresh();

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

  const folowStatus = !userAsset ? 'Seguir' : 'Seguindo';
  const svgName = !userAsset ? 'plusSign' : 'check';

  const followClass = !userAsset ? 'blue' : 'white';

  return (
    <button onClick={handleAsset} className={`followAssetButton ${followClass}`}>
      <DisplaySvg name={svgName} width="18" height="18" /> {folowStatus}
    </button>
  );
}
