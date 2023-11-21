import React from 'react';

import { usePathname } from "next/navigation";

import Navbar from 'components/base/Navbar';

export default function Header({ ...props }) {
  const { childrenSegment = '' } = props;

  // const pathname = usePathname();
  // console.log(pathname);

  return (
    <header className={`main-header p-4`} data-js="main-header">
      <Navbar />
    </header>
  )
}
