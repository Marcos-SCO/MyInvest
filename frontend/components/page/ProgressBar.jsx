'use client';

import React from 'react';

import NextTopLoader from 'nextjs-toploader';

export default function ProgressBar() {
  return (
    <>
      <NextTopLoader color="#0E4690E5"
        initialPosition={0.08}
        crawlSpeed={200}
        height={5}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={500} />
    </>
  )
}
