function formatCurrency(input) {
  // Remove any non-digit characters from the input
  if (!input) return;
  
  const number = parseFloat(input.replace(/[^0-9.-]+/g, ''));

  const isUsd = input.indexOf('$') !== -1;

  if (isUsd) {
    // Format as USD
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }

  if (!isUsd) {
    // Format as BRL (Brazilian Real)
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
  }
}

function getAssetTypeDescription(type) {
  const types = {
    1: {
      backendCode: 1,
      typeSlug: 'acoes',
      category: 'Ações',
      nameDescription: 'Ação Brasileira',
    },
    2: {
      backendCode: 2,
      typeSlug: 'stocks',
      category: 'Stocks',
      nameDescription: 'Ação Norte Americana',
    },
    3: {
      backendCode: 3,
      typeSlug: 'fiis',
      category: 'Fiis',
      nameDescription: 'Fundo Imobiliário',
    },
  }

  return types[type] ?? false;
}

export { getAssetTypeDescription, formatCurrency };