export const numberToString = (number, fractionDigits) =>
  number &&
  number.toLocaleString("cs-CZ", { maximumFractionDigits: fractionDigits });
