import { useQuery } from '@apollo/client';
import { USER_QUERY } from 'api';
import { UsersPermissionsUserEntityResponse } from 'types/GraphqlTypes';

export const useUser = (id: string) => {
  const { data, refetch, loading } = useQuery<{
    usersPermissionsUser: UsersPermissionsUserEntityResponse;
  }>(USER_QUERY, {
    variables: { id },
    fetchPolicy: 'cache-first',
    skip: !id,
  });

  const userData = data?.usersPermissionsUser.data?.attributes;

  return {
    userData,
    refetch,
    loading,
  };
};
