import { gql } from '@apollo/client';

export const USERS_PERMISSIONS_USER = gql`
  query UsersPermissionsUser($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          email
          provider
          confirmed
          blocked
          role {
            data {
              id
              attributes {
                name
                description
                type
              }
            }
          }
          firstName
          lastName
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
          phone
          linkedIn
          dateEmployment
          salaryInfo
          position
        }
      }
    }
  }
`;
