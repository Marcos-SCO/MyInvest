'use client';

import { useEffect } from "react";

const HashClickAfterLoading = () => {
  useEffect(() => {
    const hasPriceModalHash = window.location.hash.includes('price-modal');

    if (!hasPriceModalHash) return;

    const priceAlertButton = document.querySelector('.priceAlertModalButton');
    if (!priceAlertButton) return;

    setTimeout(() => {
      priceAlertButton.click();
    }, 0);

  }, []);

  return null;
};

export default HashClickAfterLoading;