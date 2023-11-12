import React from 'react';

export default function AssetDetails({ symbolProps }) {
  const { symbolsData, id, name, nameDescription, currentPrice } = symbolProps;

  const closingPrice = symbolsData?.closingPrice;
  const dividendYield = symbolsData?.dividendYield;

  const variation = symbolsData?.variation;
  const replaceNumberComma = +(variation?.replace(',', '.')) ?? 0;

  const variationUp = symbolsData?.variationUp;

  const variationPercentage = replaceNumberComma.toFixed(2) + '%'

  return (
    <div>
      <p>{nameDescription}</p>
      <p>Nome: {name}</p>
      <p>Preço atual: {currentPrice}</p>
      <p>Variação percentual: {variationPercentage}</p>
    </div>
  )
}
