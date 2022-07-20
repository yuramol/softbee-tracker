import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { Header } from '../Header';

export const EmployeeLayout = () => {
  const { user } = useAuth();

  // console.log(user);

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  if (user === true) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
