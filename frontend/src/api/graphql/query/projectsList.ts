import { gql } from '@apollo/client';

export const TRECKERS_BY_USER_ID_QUERY = gql`
  query projects {
    data {
      attributes {
        name
      }
    }
  }
`;
