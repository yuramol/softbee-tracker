import { useNavigate } from 'react-router-dom';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLocalStorage } from './hooks';
import { ME_QUERY } from './api';
import { Role } from './constants';

type Props = { children: React.ReactNode };

type AuthUser = {
  id: string;
  username: string;
  role: {
    type: Role;
  };
};

type AppAuthContext = {
  jwt: string | null;
  user: AuthUser | boolean;
  login: (jwt: string, authUser: AuthUser) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AppAuthContext>({} as AppAuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage('jwt', null);
  const [user, setUser] = useState<AuthUser | boolean>(!!jwt);
  const [meQury] = useLazyQuery(ME_QUERY, { fetchPolicy: 'cache-and-network' });
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt !== null) {
      meQury()
        .then(({ data }) => {
          setUser(data.me);
        })
        .catch(() => {
          setUser(false);
        });
    }
  }, [jwt]);

  const login = async (jwt: string, authUser: AuthUser) => {
    setJwt(jwt);
    setUser(authUser);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setJwt(null);
    setUser(false);
    navigate('/login', { replace: true });
  };

  const value: AppAuthContext = useMemo(
    () => ({
      jwt,
      user,
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
