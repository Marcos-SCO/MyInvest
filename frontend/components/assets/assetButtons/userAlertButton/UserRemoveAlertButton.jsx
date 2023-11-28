'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

import { deletePriceAlert } from '../../../../app/api/assets/userAlerts/deletePiceAlert';

const removePreFetchFromLinks = dynamic(() => import('../../../../app/helpers/dom/index'),{ssr: false});

export default async function UserRemoveAlertButton({ props }) {

  const userId = props?.userId;
  const alertId = props?.alertId;
  const token = props?.token;

  if (!userId || !alertId || !token) return;

  const deleteObj = { userId, alertId, token };

  const areYouSure =
    'Tem certeza que deseja cancelar alerta?';

  async function handleDeleteAlert(e) {

    removePreFetchFromLinks();

    const confirmDelete = window.confirm(areYouSure);
    if (!confirmDelete) return;

    const alertDeleted = await deletePriceAlert(deleteObj);
    const alertWasDeleted = alertDeleted?.assetCreated;

    if (!alertWasDeleted) {
      console.error(`${alertDeleted?.message}`);
      window.alert(`Não foi possível remover o alerta!`);
      return;
    }

    const closestAssetContainer =
      e.target.closest('[data-js="asset-container"]')
      ?? e.target.closest('[data-js="asset-card-item"]');

    if (closestAssetContainer) {
      closestAssetContainer.style = 'display:none';
    }

    window.alert('Alerta foi removido com sucesso!');
  }

  return (
    <button onClick={handleDeleteAlert} className={`deleteButton`} title={`Remover Alerta?`}>
      <DisplaySvg name={'trash'} width="18" height="18" />
    </button>
  )
}
