import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks';

type Props = { children: React.ReactNode };
export interface AppAuthContextInterface {
  jwt: string | null;
  login: (jwt: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AppAuthContextInterface | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage('jwt', null);
  const navigate = useNavigate();

  const login = async (jwt: string) => {
    setJwt(jwt);
    navigate('/');
  };

  const logout = () => {
    setJwt(null);
    navigate('/', { replace: true });
  };

  const value: AppAuthContextInterface = useMemo(
    () => ({
      jwt,
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
