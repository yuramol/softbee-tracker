import { gql } from '@apollo/client';

export const ROLES_QUERY = gql`
  query Roles($filters: UsersPermissionsRoleFiltersInput!) {
    usersPermissionsRoles(filters: $filters, pagination: { limit: -1 }) {
      data {
        id
        attributes {
          name
          type
        }
      }
    }
  }
`;
