import React from 'react';
import Link from "next/link";

const baseUlr = process.env.FRONT_END_BASE_URL;

export default function UserAssetsButton({ ...props }) {
  const { userId = false } = props;

  if (!userId) return;

  return (
    <>
      <Link rel="prefetch" href={`${baseUlr}/user/assets`} className="myAssetsButton myButtonSvg">Acessar meus ativos</Link>
    </>
  )
}
