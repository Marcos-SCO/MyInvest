import React from 'react';

export default function AlertDetails({ alertProps }) {
  const { id, priceAlertTypeId, expectedPriceValue, name, nameDescription, assetSlug, currentPriceValue } = alertProps;

  // const dividendYield = symbolsData?.dividendYield;

  // const variation = symbolsData?.variation;
  // const replaceNumberComma = +(variation?.replace(',', '.')) ?? 0;

  // const variationUp = symbolsData?.variationUp;

  // const variationPercentage = replaceNumberComma.toFixed(2) + '%'

  return (
    <div>
      <p>{nameDescription}</p>
      <p>Nome: {name}</p>
      <p>Tipo de alerta: {priceAlertTypeId}</p>
      <p>Preço programado: {expectedPriceValue}</p>
      <p>Preço atual: {currentPriceValue}</p>
    </div>
  )
}
