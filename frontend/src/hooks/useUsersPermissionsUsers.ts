import { useQuery } from '@apollo/client';
import { USERS_QUERY } from 'api';

export const useUsersPermissionsUsers = () => {
  const { data, refetch, loading } = useQuery(USERS_QUERY);

  const users = data ? data?.usersPermissionsUsers?.data : null;
  return {
    users,
    refetch,
    loading,
  };
};
