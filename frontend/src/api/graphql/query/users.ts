import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users {
    usersPermissionsUsers(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          username
          firstName
          lastName
          role {
            data {
              attributes {
                name
                type
              }
            }
          }
        }
      }
    }
  }
`;
