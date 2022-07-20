import React, { createContext, useContext, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks';
import { ME_QUERY } from './api';

type Props = { children: React.ReactNode };

type AuthUser = {
  id: string;
  username: string;
  role: {
    type: string;
  };
};

export interface AppAuthContextInterface {
  jwt: string | null;
  user: () => Promise<AuthUser | null>;
  login: (jwt: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AppAuthContextInterface | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage('jwt', null);
  const [meQuery] = useLazyQuery(ME_QUERY);
  const navigate = useNavigate();

  const user = async () => {
    if (jwt) {
      const { data } = await meQuery();

      return data.me;
    }

    return null;
  };

  const login = async (jwt: string) => {
    setJwt(jwt);
    navigate('/');
  };

  const logout = () => {
    setJwt(null);
    navigate('/login', { replace: true });
  };

  const value: AppAuthContextInterface = useMemo(
    () => ({
      jwt,
      user,
      login,
      logout,
    }),
    [jwt]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
