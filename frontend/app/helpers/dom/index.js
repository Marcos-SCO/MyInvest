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

export { attributesToString, limitString };