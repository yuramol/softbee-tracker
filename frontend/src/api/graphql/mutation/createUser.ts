import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UsersPermissionsUserInput!) {
    createUsersPermissionsUser(data: $data) {
      data {
        id
        attributes {
          firstName
          lastName
          email
          username
          salaryInfo
          dateEmployment
        }
      }
    }
  }
`;
