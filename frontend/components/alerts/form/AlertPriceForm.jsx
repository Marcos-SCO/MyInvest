"use client";

import React, { useState } from 'react';
import { addPriceAlert } from '../../../app/api/assets/userAlerts/addPriceAlert';
import { getFormatToInsertPrice } from '../../../app/helpers/assets';
import Link from 'next/link';

import { formatCurrency } from '../../../app/helpers/assets';

import { toast } from 'react-toastify';

export default function AlertPriceForm(props) {

  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

  const { userId, assetId, assetTicker, assetCurrentPrice, token, assetType = 1 } = props?.insertAlertObj;

  const currentPrice =
    getFormatToInsertPrice(assetCurrentPrice);

  const priceTypeDescription =
    { 1: 'Menor ou igual', 2: 'Maior ou igual', }

  const [focused, setFocused] = useState({
    focus: false,
    invalid: false,
  });

  const handleFocus = (bool) => {
    setFocused({
      focus: bool,
      invalid: bool,
    });
  }

  const [inputState, setInputState] = useState({
    expectedPrice: currentPrice,
    type: 1,
  });

  const formFeedBackError = inputState?.formFeedBackError;

  const replaceNumberCommas = assetType == 2
    ? currentPrice.replace(',', '.')
    : currentPrice;

  // 1 - Menor ou igual | 2 - Maior ou igual
  const minValue = inputState.type == 1
    ? 0
    : +parseFloat(replaceNumberCommas);

  const currencyValue = +assetType == 2 ? 'usd' : 'brl';

  const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { expectedPrice, type } = inputState;

    setInputState({ ...inputState, formFeedBackError: false });

    const expectedPriceValue =
      getFormatToInsertPrice(expectedPrice);

    const expectedPriceTextDisplay =
      formatCurrency(`${expectedPrice}`, currencyValue);

    const isExpectedPriceEqualToCurrentPrice =
      expectedPriceValue == +currentPrice;

    const isValueLasThanZero = +expectedPrice <= 0;
    if (isValueLasThanZero) {
      const lessThanZeroMessage =
        `Selecione um valor maior que zero!`;

      console.log(lessThanZeroMessage);

      toast.error(lessThanZeroMessage);

      setInputState({ ...inputState, formFeedBackError: lessThanZeroMessage });

      handleFocus(true);

      return;
    }

    if (isExpectedPriceEqualToCurrentPrice) {
      const samePriceMessage = `Selecione um valor diferente do preço atual de ${expectedPriceTextDisplay}`;

      console.log(samePriceMessage);

      toast.error(samePriceMessage);

      setInputState({ ...inputState, formFeedBackError: samePriceMessage });

      handleFocus(true);

      return;
    }

    console.log('ticker', assetTicker);
    console.log('expected', expectedPriceValue);
    console.log('currentPrice', currentPrice);

    const insertObj = {
      token,
      userId,
      assetId,
      priceAlertTypeId: type,
      expectedPrice,
    }

    const insertedAlert = await addPriceAlert(insertObj);

    const isAlertCreated = insertedAlert?.assetCreated;
    const userAlreadyHasSchedule = insertedAlert?.data?.error;

    const typeDescription =
      priceTypeDescription[type] + ' a' ?? '';

    if (!userAlreadyHasSchedule) {
      const alertCreatedMessage = `Alerta para o ativo ${assetTicker} foi criado no preço ${typeDescription} ${expectedPriceTextDisplay}`;

      toast.success(alertCreatedMessage);
    }

    if (userAlreadyHasSchedule) {
      const alertNotCreatedMessage = userAlreadyHasSchedule;

      const alreadyCreatedMessage = `Você já possui um alerta <br/> "${typeDescription}" ${expectedPriceTextDisplay} para ${assetTicker}`;

      console.log(alreadyCreatedMessage);
      
      toast.error(`Você já possui um alerta "${typeDescription}" ${expectedPriceTextDisplay} para ${assetTicker}`);

      setInputState({ ...inputState, formFeedBackError: alreadyCreatedMessage });

      handleFocus(true);
    }

    console.log(insertedAlert);

    return;
  }

  return (
    <div className="alert-container my-5 md:p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

        <div className='form-main-content'>
          <div className='input-container flex flex-col'>
            <label htmlFor="type">Tipo de alerta: </label>
            <select
              id="type"
              name="type"
              value={inputState.type}
              onChange={handleInput}
            >
              <option value="" disabled>Tipo de alerta</option>
              <option value="1">Menor ou igual</option>
              <option value="2">Maior ou igual</option>
            </select>
          </div>

          <div className={`input-container flex flex-col${focused.invalid ? ' invalid' : ''}`}>
            <label htmlFor="expectedPrice">Valor:</label>
            <input
              type="number"
              id="expectedPrice"
              name="expectedPrice"
              value={+inputState?.expectedPrice}
              onChange={handleInput}
              min={minValue}
              step="0.01"
              onClick={() => handleFocus(false)}
              onBlur={() => handleFocus(false)}
              focused={focused.focus.toString()}
              className={focused.invalid ? 'invalid' : ''}
            />
          </div>
        </div>

        <div className='myButton-container'>
          <button type="submit" className="myButton">
            Enviar
          </button>
        </div>

        {formFeedBackError && <div className="form-feed-back" data-js="form-feed-back">
          <p dangerouslySetInnerHTML={{ __html: formFeedBackError }} />
        </div>}

      </form>


    </div>
  )
}
