function cleanCurrency(input: any) {
  // Use a regular expression to match the numeric part, including decimals and commas
  const regex = /[\d,.]+/;

  const isInputString = typeof input === 'string';

  const inputValue =
    isInputString ? input : input?.toFixed(2);

  // Use the regular expression to find the numeric part in the input
  const match = inputValue.match(regex);

  // If a match is found, return the matched value, else return the original input
  return match ? match[0] : inputValue;
}

export { cleanCurrency };