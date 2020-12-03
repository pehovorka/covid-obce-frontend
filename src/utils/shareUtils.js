import { gql } from "@apollo/client";

export const OBEC_NAZEV_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      obec_nazev
      obec_kod
    }
  }
`;

export const isValidMunicipalityCode = (code) => {
  code = parseInt(code);
  if (Number.isInteger(code) && code.toString().length === 6) {
    return true;
  }
  return false;
};
