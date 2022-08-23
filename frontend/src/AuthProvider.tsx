import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { useLocalStorage } from 'hooks';
import { ME_QUERY } from 'api';
import { Role } from './constants';
import { Maybe, Scalars } from 'types/GraphqlTypes';

type Props = { children: React.ReactNode };

export type AuthUser = {
  id: string;
  username: string;
  role: {
    type: Role;
  };
};

type AppAuthContext = {
  jwt: string | null;
  user: AuthUser;
  isAuth: boolean;
  isManager: boolean;
  login: (
    jwt: Maybe<Scalars['String']> | undefined,
    authUser: AuthUser
  ) => void;
  logout: () => void;
};

export const AuthContext = createContext<AppAuthContext>({} as AppAuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage('jwt', null);
  const [user, setUser] = useState<AuthUser>({} as AuthUser);
  const [isManager, setIsManager] = useState(false);
  const [meQuery] = useLazyQuery<{ me: AuthUser }>(ME_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt !== null) {
      meQuery()
        .then(({ data }) => {
          if (data) {
            setUser(data.me);
            setIsManager(data.me.role.type === Role.Manager);
          }
        })
        .catch(() => {
          setUser({} as AuthUser);
          setIsManager(false);
        });
    }
  }, [jwt]);

  const isAuth = Object.keys(user).length !== 0;

  const login = (
    jwt: Maybe<Scalars['String']> | undefined,
    authUser: AuthUser
  ) => {
    setJwt(jwt);
    setUser(authUser);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setJwt(null);
    setUser({} as AuthUser);
    setIsManager(false);
    navigate('/login', { replace: true });
  };

  const value: AppAuthContext = useMemo(
    () => ({
      jwt,
      user,
      isAuth,
      isManager,
      login,
      logout,
    }),
    [jwt, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
