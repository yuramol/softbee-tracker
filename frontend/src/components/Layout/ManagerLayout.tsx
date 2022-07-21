import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { Header } from '../Header';
import { managerPages } from '../../constants';

export const ManagerLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Header pages={managerPages} />
      <Outlet />
    </>
  );
};
