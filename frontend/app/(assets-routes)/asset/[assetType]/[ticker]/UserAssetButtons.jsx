import React from 'react';

import AssetFavButton from "../../../../../components/assetButtons/layout";

import Link from "next/link";

export default function UserAssetButtons({ ...props }) {
  const { assetId, userId } = props;

  return (
    <>
      <Link rel="prefetch" href={`/user/assets`} className="block p-2 w-40 border border-gray-300 rounded-md mb-2">Acessar meus ativos</Link>
    </>
  )
}
