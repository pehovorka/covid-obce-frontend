import { gql } from "@apollo/client";

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
  code = parseInt(code);
  if (Number.isInteger(code) && code.toString().length === 6) {
    return true;
  }
  return false;
};
