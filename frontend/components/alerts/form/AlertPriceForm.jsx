"use client";

import React, { useState } from 'react';
import { addPriceAlert } from '../../../app/api/assets/userAlerts/addPriceAlert';
import { getFormatToInsertPrice } from '../../../app/helpers/assets';
import Link from 'next/link';


export default function AlertPriceForm(props) {

  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

  const { userId, assetId, assetTicker, assetCurrentPrice, token } = props?.insertAlertObj;

  const currentPrice =
    getFormatToInsertPrice(assetCurrentPrice);

  const priceTypeDescription = { 1: 'Menor ou igual', 2: 'Maior ou igual', }

  const [inputState, setInputState] = useState({
    // expectedPrice: "15,350.30",
    expectedPrice: currentPrice,
    type: 1,
  });

  // 1 - Menor ou igual | 2 - Maior ou igual
  const minValue = inputState.type == 1
    ? 0 : +parseFloat(currentPrice.replace(',', '.'));

  const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { expectedPrice, type } = inputState;

    const expectedPriceValue =
      getFormatToInsertPrice(expectedPrice);

    const isExpectedPriceEqualToCurrentPrice =
      expectedPriceValue == +currentPrice;

    const isValueLasThanZero = +expectedPrice <= 0;
    if (isValueLasThanZero) {
      const lessThanZeroMessage =
        `Selecione um valor maior que zero!`;

      window.alert(lessThanZeroMessage);
      return;
    }

    if (isExpectedPriceEqualToCurrentPrice) {
      const samePriceMessage = `Selecione um valor diferente do preço atual de ${currentPrice}`;

      window.alert(samePriceMessage);
      return;
    }

    console.log('ticker', assetTicker);
    console.log('expected', expectedPriceValue);
    console.log('currentPrice', currentPrice);

    const insertObj = {
      token,
      userId,
      assetId,
      type,
      expectedPrice,
    }

    const insertedAlert = await addPriceAlert(insertObj);

    const isAlertCreated = insertedAlert?.assetCreated;
    const userAlreadyHasSchedule = insertedAlert?.data?.error;

    const typeDescription =
      priceTypeDescription[type] + ' a' ?? '';

    if (!userAlreadyHasSchedule) {
      const alertCreatedMessage = `Alerta para o ativo ${assetTicker} foi criado no preço ${typeDescription} ${expectedPrice}`;

      window.alert(alertCreatedMessage);
    }

    if (userAlreadyHasSchedule) {
      const alertNotCreatedMessage = userAlreadyHasSchedule;

      const alreadyCreatedMessage = `Alerta ${typeDescription} ${expectedPrice} já havia sido criado para ${assetTicker}`;

      window.alert(alreadyCreatedMessage);
    }

    console.log(insertedAlert);

    // const answer = window.confirm('Usuário já está cadastrado');

    return;
  }

  return (
    <div className="my-10 p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

        <Link rel="prefetch" href={`${baseUrl}/user/alerts`}>Ir até Meus alertas</Link>

        <p className='shadow-md'>Valor atual do ativo: {currentPrice}</p>

        <div className='shadow-md'>
          <label htmlFor="type">Tipo de alerta: </label>
          <select
            id="type"
            name="type"
            value={inputState.type}
            onChange={handleInput}
          >
            <option value="" disabled>Selecione o tipo</option>
            <option value="1">Menor ou igual</option>
            <option value="2">Maior ou igual</option>
          </select>
        </div>

        <div className='shadow-md'>
          <label htmlFor="expectedPrice">Enter a Number:</label>
          <input
            type="number"
            id="expectedPrice"
            name="expectedPrice"
            value={inputState?.expectedPrice}
            onChange={handleInput}
            min={minValue}
            step="0.01"
          />
          <p>Valor selecionado: {inputState?.expectedPrice}</p>
        </div>

        <div>
          <button
            type="submit"
            className="sendButton flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Enviar</button>
        </div>
      </form>


    </div>
  )
}
