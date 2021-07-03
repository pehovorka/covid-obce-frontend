import { gql } from "@apollo/client";

export const MUNICIPALITY_NAME_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      obec_nazev
    }
  }
`;

export const MUNICIPALITY_DETAIL_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      datum
      aktualne_nemocnych
      nove_pripady
      nove_pripady_65
    }
  }
`;

export const MUNICIPALITY_NAMES_SEARCH_QUERY = gql`
  query Obce_nazvy($obec_nazev: String!) {
    obce(obec_nazev: $obec_nazev, datum: "2020-11-05") {
      obec_nazev
      obec_kod
      okres_nazev
    }
  }
`;

export const LAST_MODIFIED_QUERY = gql`
  query lastModified {
    lastModified {
      last_modified
    }
  }
`;
