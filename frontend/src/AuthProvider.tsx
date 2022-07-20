import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

type AppAuthContext = {
  jwt: string | null;
  user: AuthUser | boolean;
  login: (jwt: string, authUser: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AppAuthContext>({} as AppAuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage('jwt', null);
  const [user, setUser] = useState<AuthUser | boolean>(!!jwt);
  const [meQury] = useLazyQuery(ME_QUERY);
  const navigate = useNavigate();

  useEffect(() => {
    meQury()
      .then(({ data }) => {
        setUser(data.me);
      })
      .catch(() => {
        setUser(false);
      });
  }, [jwt]);

  const login = (jwt: string, authUser: AuthUser) => {
    setJwt(jwt);
    setUser(authUser);
    navigate('/');
  };

  const logout = () => {
    setJwt(null);
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
