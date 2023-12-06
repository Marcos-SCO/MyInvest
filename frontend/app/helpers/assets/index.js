function formatCurrency(input, currencyDefinition = false) {
  // Remove any non-digit characters from the input
  if (!input) return;

  const number = parseFloat(input.replace(/[^0-9.-]+/g, ''));

  const isUsd = input.indexOf('$') !== -1;

  const lowerCurrencyDefinition = currencyDefinition
    ? currencyDefinition?.toLowerCase() : false;

  const isUsCurrency = lowerCurrencyDefinition == 'usd';
  const isBrCurrency = lowerCurrencyDefinition == 'brl';

  if (isUsd || isUsCurrency) {
    // Format as USD
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }

  if (!isUsd || isBrCurrency) {
    // Format as BRL (Brazilian Real)
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
  }
}

function getFormatToInsertPrice(input) {

  if (!input) return;

  // const removeComma = input.replace(/,/g, '.');

  const number = input.replace(/[R$]/g, '')
    .replace(',', '.');

  // const formattedNumber = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  //   .format(number)
  //   .replace('$', '');

  return number;
}

function getAssetTypeDescription(type) {
  const types = {
    1: {
      backendCode: 1,
      typeSlug: 'acoes',
      category: 'Ações',
      nameDescription: 'Ação Brasileira',
      currenCySymbol: 'R$',
      currencyName: 'BRL',
    },
    2: {
      backendCode: 2,
      typeSlug: 'stocks',
      category: 'Stocks',
      nameDescription: 'Ação Norte Americana',
      currenCySymbol: '$',
      currencyName: 'USD',
    },
    3: {
      backendCode: 3,
      typeSlug: 'fiis',
      category: 'Fiis',
      nameDescription: 'Fundo Imobiliário',
      currenCySymbol: 'R$',
      currencyName: 'BRL',
    },
  }

  return types[type] ?? false;
}

function variationRemoveSpecialChars(inputString) {
  // Remove special characters including +, -, and %
  return inputString?.replace(/[\+\-%]/g, '');
}

export { getAssetTypeDescription, formatCurrency, getFormatToInsertPrice, variationRemoveSpecialChars };