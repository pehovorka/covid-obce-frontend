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
      municipalityPopulation
      districtName
      orpId
      orpName
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

export const SERVER_INFO = gql`
  query ServerInfo {
    serverInfo {
      apiVersion
      importerVersion
    }
  }
`;

export const ORP_VACCINATIONS_QUERY = gql`
  query OrpVaccinations($orpId: Int!, $limit: Int!) {
    orpVaccinations(orpId: $orpId, limit: $limit) {
      orpId
      orpName
      orpPopulation
      vaccineNames {
        vaccineId
        vaccineName
      }
      days {
        date
        doses {
          o
          nd
          td
        }
        vaccines {
          v
          nd
          td
        }
      }
    }
  }
`;

export const MUNICIPALITY_OVERVIEW_QUERY = gql`
  query MunicipalityCasesOverview {
    municipalityCasesOverview {
      id
      mn
      dn
      rc
      ac
      d
    }
  }
`;
