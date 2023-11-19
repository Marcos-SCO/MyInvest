import React from 'react';

import Navbar from 'components/base/Navbar';

export default function Header({ ...props }) {
  const { childrenSegment = '' } = props;

  const segmentName = childrenSegment?.toLowerCase();
  const dontApplyShadowIn = ['__page__'];

  const headerShadow =
    dontApplyShadowIn.includes(segmentName) ? '' : 'shadow-md';

  return (
    <header className={`p-4 ${headerShadow}`}>
      <Navbar />
    </header>
  )
}
