'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

import { deletePriceAlert } from '../../../../app/api/assets/userAlerts/deletePiceAlert';

const removePreFetchFromLinks = dynamic(() => import('../../../../app/helpers/dom/index'),{ssr: false});

import { toast } from 'react-toastify';

export default async function UserRemoveAlertButton({ props }) {

  const userId = props?.userId;
  const alertId = props?.alertId;
  const token = props?.token;

  if (!userId || !alertId || !token) return;

  const deleteObj = { userId, alertId, token };

  const areYouSure =
    'Tem certeza que deseja remover alerta?';

  async function handleDeleteAlert(e) {

    removePreFetchFromLinks();

    const confirmDelete = await swal({
      title: "Remover alerta?",
      text: areYouSure,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", "Remover!"],
    })
      .then((willDelete) => {
        // if (willDelete) { swal("Alerta removido ativo", { icon: "success",}); }
        if (willDelete) { return true; }
        return false;
      });

    if (!confirmDelete) return;

    const alertDeleted = await deletePriceAlert(deleteObj);
    const alertWasDeleted = alertDeleted?.assetCreated;

    if (!alertWasDeleted) {
      console.error(`${alertDeleted?.message}`);
      toast.error('Não foi possível remover o alerta!');
      return;
    }

    const closestAssetContainer =
      e.target.closest('[data-js="asset-container"]')
      ?? e.target.closest('[data-js="asset-card-item"]');

    if (closestAssetContainer) {
      closestAssetContainer.style = 'display:none';
    }

    toast.success('Alerta foi removido com sucesso!');
  }

  return (
    <button onClick={handleDeleteAlert} className={`deleteButton`} title={`Remover Alerta?`}>
      <DisplaySvg name={'trash'} width="18" height="18" />
    </button>
  )
}
