import { useQuery } from '@apollo/client';
import { USER_QUERY } from 'api';
import {
  Scalars,
  UsersPermissionsUserEntityResponse,
} from 'types/GraphqlTypes';

export const useUser = (id: Scalars['ID']) => {
  const { data, refetch, loading } = useQuery<{
    usersPermissionsUser: UsersPermissionsUserEntityResponse;
  }>(USER_QUERY, {
    variables: { id },
  });

  const userData = data?.usersPermissionsUser.data?.attributes;

  return {
    userData,
    refetch,
    loading,
  };
};
