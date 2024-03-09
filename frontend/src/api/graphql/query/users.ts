import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users($filters: UsersPermissionsUserFiltersInput, $sort: [String!]) {
    usersPermissionsUsers(
      filters: $filters
      pagination: { limit: -1 }
      sort: $sort
    ) {
      data {
        id
        attributes {
          username
          firstName
          lastName
          positions
          username
          blocked
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
