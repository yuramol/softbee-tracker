import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { ME_QUERY } from 'api';
import { Role } from 'constants/types';
import { Maybe, Scalars } from 'types/GraphqlTypes';

export type AuthUser = {
  id: string;
  username: string;
  role: {
    type: Role;
  };
};

export const useAuthUser = () => {
  const navigate = useNavigate();
  const { storedValue: jwt, setStorageValue: setJwt } = useLocalStorage('jwt');
  const [meQuery, { data, client }] = useLazyQuery<{ me: AuthUser }>(ME_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const user = data?.me ?? {
    id: '',
    username: '',
    role: { type: Role.Public },
  };
  const isAuth = user.role.type !== Role.Public;
  const isManager = user.role.type === Role.Manager;

  useEffect(() => {
    if (jwt !== '') {
      meQuery();
    }
  }, [jwt]);

  const login = (jwt: Maybe<Scalars['String']>) => {
    setJwt(jwt);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setJwt('');
    client.resetStore();
  };

  return {
    jwt,
    user,
    isAuth,
    isManager,
    login,
    logout,
  };
};
