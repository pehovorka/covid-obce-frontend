import { gql } from "@apollo/client";

export const MUNICIPALITY_NAME_QUERY = gql`
  query MunicipalityName($municipalityId: Int!) {
    municipalityCases(municipalityId: $municipalityId, limit: 0) {
      municipalityName
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

export const MUNICIPALITY_CASES_METADATA = gql`
  query MunicipalityCasesMetadata {
    municipalityCasesMetadata {
      sourceUpdatedAt
      collectionUpdatedAt
    }
  }
`;
