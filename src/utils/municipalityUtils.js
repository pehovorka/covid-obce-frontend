import { gql } from "@apollo/client";

export const OBEC_NAZEV_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      obec_nazev
    }
  }
`;

export const OBEC_DETAIL_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      datum
      aktualne_nemocnych
      nove_pripady
    }
  }
`;

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

export const convertToGraphData = (stringData, limit) => {
  const graphData = stringData.map((item) => {
    const container = {};
    container.datum = new Date(item.datum).toLocaleDateString("cs-CZ", {});
    container.aktualne_nemocnych = parseInt(item.aktualne_nemocnych);
    container.nove_pripady = parseInt(item.nove_pripady);
    return container;
  });
  graphData.reverse();
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
  if (municipalities.some((e) => e.obec_kod === municipalityCodeToCheck)) {
    return true;
  }
  return false;
};
