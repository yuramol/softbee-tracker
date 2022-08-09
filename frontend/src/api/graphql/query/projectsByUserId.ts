import { gql } from '@apollo/client';

export const PROJECTS_BY_USER_ID_QUERY = gql`
  query ProjectsByUserId($userId: ID!) {
    projects(filters: { users: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
