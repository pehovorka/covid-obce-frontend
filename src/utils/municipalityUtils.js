export const isValidMunicipalityCode = (code) => {
  if (code.length !== 6) {
    return false;
  }
  code = parseInt(code);
  if (Number.isInteger(code)) {
    return true;
  }
  return false;
};

export const convertToGraphData = (days, limit) => {
  if (!days) return null;
  const graphData = days.map((item, index) => {
    const container = {};
    //container.date = new Date(item.datum).toLocaleDateString("cs-CZ", {});
    container.date = item.d;
    container.activeCases = item.ac;
    container.newCases = item.nc;
    container.newCasesOver65 = item.nc65;
    container.newCasesUnder65 = item.nc - item.nc65;

    const newCasesAverage =
      (days[index - 3]?.nc +
        days[index - 2]?.nc +
        days[index - 1]?.nc +
        item.nc +
        days[index + 1]?.nc +
        days[index + 2]?.nc +
        days[index + 3]?.nc) /
      7;
    container.newCasesAverage = !isNaN(newCasesAverage)
      ? newCasesAverage.toFixed(1)
      : null;
    return container;
  });
  return graphData.slice(-limit);
};

export const formatNumberToDisplay = (number) => {
  let result = parseInt(number).toLocaleString("cs-CZ");
  return result;
};

export const formatChangeNumberToDisplay = (number) => {
  let result =
    (number > 0 ? "+ " : number === 0 ? "" : "- ") +
    Math.abs(number).toLocaleString("cs-CZ");
  return result;
};

export const isAlreadyAdded = ({ municipalityCodeToCheck, municipalities }) => {
  if (municipalities.some((e) => e.code === municipalityCodeToCheck)) {
    return true;
  }
  return false;
};
