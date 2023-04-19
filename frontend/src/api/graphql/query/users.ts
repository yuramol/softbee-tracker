import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users($filters: UsersPermissionsUserFiltersInput) {
    usersPermissionsUsers(filters: $filters, pagination: { limit: -1 }) {
      data {
        id
        attributes {
          username
          firstName
          lastName
          positions
          username
          avatar {
            data {
              id
              attributes {
                name
                url
                provider
                hash
                size
                mime
              }
            }
          }
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
