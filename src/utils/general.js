export const numberToString = (number, fractionDigits) =>
  number &&
  number.toLocaleString("cs-CZ", { maximumFractionDigits: fractionDigits });

export const dateToLongString = (date) =>
  date &&
  date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
