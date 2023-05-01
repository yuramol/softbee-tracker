import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
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
          positions
        }
      }
    }
  }
`;
