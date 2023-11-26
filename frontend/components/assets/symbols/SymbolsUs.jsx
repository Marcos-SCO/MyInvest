import React from 'react';

import { variationRemoveSpecialChars } from '../../../app/helpers/assets';

export default function SymbolsUs({ symbols }) {
  const { symbol, companyName, } = symbols;

  const primaryData = symbols?.primaryData;

  const percentageChange =
    primaryData?.percentageChange ?? "N/A";

  const detailIndicator =
    primaryData?.deltaIndicator == 'up';

  const variationValue =
    variationRemoveSpecialChars(percentageChange);

  return (
    <div>
      <p>Variação percentual: {variationValue}</p >
      <p>Subiu? {detailIndicator.toString()}</p>
    </div>
  )
}
