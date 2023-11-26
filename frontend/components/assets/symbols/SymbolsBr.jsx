import React from 'react';

export default function SymbolsBr({ symbols }) {
  const { name, code, variation, variationUp, price } = symbols;

  return (
    <div>
      <p>Variação percentual: {variation}</p>
      <p>Subiu? {variationUp.toString()}</p>
    </div>
  )
}
