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
  query municipalitySearch($name: String!) {
    municipalitySearch(name: $name, limit: 25) {
      municipalityId
      municipalityName
      districtName
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
