function attributesToString(attributes) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
}

function limitString(inputString, maxLength, stringEnd = '...') {

  const stringHaveMoreCharacterThanMaxLength =
    inputString?.length > maxLength;

  if (stringHaveMoreCharacterThanMaxLength) {
    return inputString.substring(0, maxLength) + stringEnd;
  }

  return inputString;
}

function removePreFetchFromLinks() {
  const preFetchItens = document.querySelectorAll(`[rel="prefetch"]`);
  if (!preFetchItens) return;

  preFetchItens.forEach((e) => {
    e.removeAttribute('rel');
  });
}

export { attributesToString, limitString, removePreFetchFromLinks };