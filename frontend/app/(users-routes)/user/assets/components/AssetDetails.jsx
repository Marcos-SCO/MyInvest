import React from 'react';

export default function AssetDetails({ symbolProps }) {
  const { symbolsData, id, name, nameDescription, currentPrice } = symbolProps;

  const closingPrice = symbolsData?.closingPrice;
  const dividendYield = symbolsData?.dividendYield;

  const variation = symbolsData?.variation;
  const variationUp = symbolsData?.variationUp;

  return (
    <div>
      <p>{nameDescription}</p>
      <p>ID: {id}</p>
      <p>Nome: {name}</p>
      <p>Preço atual: {currentPrice}</p>
      <p>Variação: {variation}</p>
    </div>
  )
}
