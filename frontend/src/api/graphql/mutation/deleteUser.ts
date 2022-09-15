import { gql } from '@apollo/client';

export const DELETE_USERS_PERMISSIONS_USER = gql`
  mutation DeleteUsersPermissionsUser($id: ID!) {
    deleteUsersPermissionsUser(id: $id) {
      data {
        id
      }
    }
  }
`;
