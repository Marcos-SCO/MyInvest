import React from 'react';

export default function StockAssetDetails({ symbolProps }) {
  const { id, name, nameDescription, currentPrice } = symbolProps;

  const symbolData = symbolProps?.symbolsData;
  const primaryData = symbolData?.primaryData;

  const percentageChange = primaryData?.percentageChange ?? "N/A";
  const detailIndicator = primaryData?.deltaIndicator ?? "N/A";

  return (
    <div>
      <p>{nameDescription}</p>
      <p>Nome: {name}</p>
      <p>Preço atual: {currentPrice}</p>
      <p>Variação percentual: {percentageChange}</p>
    </div>
  )
}
