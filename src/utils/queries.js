import { gql } from "@apollo/client";

export const MUNICIPALITY_NAME_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      obec_nazev
    }
  }
`;

export const MUNICIPALITY_CASES_QUERY = gql`
  query MunicipalityCases($municipalityId: Int!, $limit: Int!) {
    municipalityCases(municipalityId: $municipalityId, limit: $limit) {
      days {
        d
        ac
        nc
        nc65
      }
    }
  }
`;

export const MUNICIPALITIES_SEARCH_QUERY = gql`
  query MunicipalitySearch($name: String!) {
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
