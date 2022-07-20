import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

export const PublicLayout = () => {
  const { user } = useAuth();

  // console.log(user);

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Outlet />
    </div>
  );
};
