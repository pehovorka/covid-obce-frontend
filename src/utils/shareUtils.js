export const isValidMunicipalityCode = (code) => {
  code = parseInt(code);
  if (Number.isInteger(code) && code.toString().length === 6) {
    return true;
  }
  return false;
};
