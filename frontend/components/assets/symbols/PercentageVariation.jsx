import React from 'react'
import { variationRemoveSpecialChars, getFormatToInsertPrice } from '../../../app/helpers/assets';

export default function PercentageVariation({ symbols }) {
  const primaryData = symbols?.primaryData;

  const percentageChange = primaryData
    ? primaryData?.percentageChange ?? "N/A"
    : symbols?.variation;

  const variationIndicator = primaryData
    ? primaryData?.deltaIndicator == 'up'
    : symbols?.variationUp;

  const variationValue =
    variationRemoveSpecialChars(percentageChange);

  const variationSignIndicator =
    variationIndicator == true ? '+' : '-';

  let variationTextValue =
    `${variationSignIndicator}${variationValue}%`;

  const isVariationGreaterThanZero =
    getFormatToInsertPrice(variationValue) > 0;

  variationTextValue = isVariationGreaterThanZero
    ? variationTextValue : `${variationValue}%`;

  const variationStatusClass =
    isVariationGreaterThanZero
      ? variationIndicator ? ' up' : ' down' : '';

  return (
    <div className={`percentage-variation${variationStatusClass}`}>
      <p>({variationTextValue})</p>
    </div>
  )
}
