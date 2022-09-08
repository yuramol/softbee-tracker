import { useQuery } from '@apollo/client';

import { ROLES_QUERY } from 'api';
import {
  UsersPermissionsRoleEntityResponseCollection,
  UsersPermissionsRoleFiltersInput,
} from 'types/GraphqlTypes';

export const useRoles = (filters: UsersPermissionsRoleFiltersInput = {}) => {
  const { data, loading, refetch } = useQuery<{
    usersPermissionsRoles: UsersPermissionsRoleEntityResponseCollection;
  }>(ROLES_QUERY, {
    variables: { filters },
  });

  const roles = data?.usersPermissionsRoles.data;
  const rolesChoices = roles?.map(({ id, attributes }) => ({
    value: id,
    label: attributes?.name,
  }));

  return {
    roles,
    rolesChoices,
    loading,
    refetch,
  };
};
