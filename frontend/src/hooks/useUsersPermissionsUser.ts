import { useQuery } from '@apollo/client';

import { USERS_PERMISSIONS_USER } from 'api';

export const useUsersPermissionsUser = (id: string) => {
  const { data, refetch, loading } = useQuery(USERS_PERMISSIONS_USER, {
    variables: { id: id },
  });

  const userPermission = data
    ? data?.usersPermissionsUser?.data?.attributes
    : null;

  return {
    userPermission,
    refetch,
    loading,
  };
};
