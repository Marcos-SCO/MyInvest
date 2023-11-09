function getBackendAssetType(type) {
  const types = {
    1: {
      backendCode: 1,
      typeSlug: 'acoes',
      nameDescription: 'Ação Brasileira',
    },
    12: {
      backendCode: 2,
      typeSlug: 'stocks',
      nameDescription: 'Ação Norte Americana',
    },
    2: {
      backendCode: 3,
      typeSlug: 'fiis',
      nameDescription: 'Fiis',
    },
  }

  return types[type] ?? false;
}

export { getBackendAssetType };