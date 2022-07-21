import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { Header } from '../Header';
import { publicPages } from '../../constants';

export const PublicLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <Header pages={publicPages} />
      <Outlet />
    </>
  );
};
