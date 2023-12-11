'use client';

import { userCreateAsset } from 'app/api/assets/userAssets/userAddAsset';
import { userRemoveAsset } from 'app/api/assets/userAssets/userRemoveAsset';
import React, { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";
import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

import { removePreFetchFromLinks } from '../../../../app/helpers/dom';

import swal from 'sweetalert';
import { setLocalStorageUserAsset } from '../../../../app/helpers/localstorage/assetsLocalStorage';

export default function ItemButton({ isUserAsset, fetchObj, removeItem }) {
  // const router = useRouter();

  const assetId = fetchObj?.assetId;

  const userAssetInitialValue = isUserAsset;
  const [userAsset, setUserAsset] = useState(userAssetInitialValue);

  const areYouSure =
    userAsset ? 'Tem certeza que deseja deixar de seguir o ativo?' : '';

  async function handleAsset(e) {

    removePreFetchFromLinks();

    if (userAsset) {
      // const confirmUnfollow = window.confirm(areYouSure);
      const confirmUnfollow = await swal({
        title: "Deixar de seguir?",
        text: areYouSure,
        icon: "warning",
        dangerMode: true,
        buttons: ["Cancelar", "OK"],
      })
        .then((willDelete) => {
          // if (willDelete) { swal("Você não está seguindo mais esse ativo", {              icon: "success",}); }
          if (willDelete) { return true; }
          return false;
        });

      if (!confirmUnfollow) return;
    }

    if (!userAsset) {
      await userCreateAsset(fetchObj);
      setUserAsset(true);

      // Use refresh to request the data from the backend without cashing
      // window.location.reload();
      // router.refresh();

      return;
    }

    const removeUserAsset = await userRemoveAsset(fetchObj);
    // console.log(removeUserAsset);

    setUserAsset(false);

    const closestAssetContainer =
      e.target.closest('[data-js="asset-container"]')
      ?? e.target.closest('[data-js="asset-card-item"]');

    if (removeItem && closestAssetContainer) {
      closestAssetContainer.style = 'display:none';
    }

    // router.refresh();
    // window.location.reload();
  }

  const followStatus = !userAsset ? 'Seguir' : 'Seguindo';
  const svgName = !userAsset ? 'plusSign' : 'check';

  const followClass = !userAsset ? 'blue' : 'white';
  const buttonTitle = !userAsset ? 'Seguir' : 'Deixar de seguir';

  if (assetId) setLocalStorageUserAsset(assetId, userAsset);

  return (
    <button onClick={handleAsset} className={`followAssetButton ${followClass}`} title={buttonTitle} data-js="followAssetButton">
      <DisplaySvg name={svgName} width="18" height="18" /> {followStatus}
    </button>
  );
}
