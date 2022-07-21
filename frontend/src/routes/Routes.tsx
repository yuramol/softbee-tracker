import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { Loader } from '../components';
import { Layout } from '../components/Layout';
import { publicPages, employeePages, managerPages } from '../constants';
import { NotFoundPage } from '../pages';

export const AppRouter = () => {
  const { user } = useAuth();

  if (user === true) return <Loader />;
  if (user && user.role === null) return <Loader />;

  const userRole = user && user.role && user.role.type;
  let pages = publicPages;

  switch (userRole) {
    case 'employee':
      pages = employeePages;
      break;
    case 'manager':
      pages = managerPages;
      break;
    default:
      break;
  }

  return (
    <Routes>
      <Route element={<Layout pages={pages} />}>
        <Route
          path="*"
          element={user ? <NotFoundPage /> : <Navigate to="/login" replace />}
        />
        {pages.map(({ index, name, href, Component }) => (
          <Route
            index={index}
            key={name}
            path={href}
            element={
              <Suspense fallback={<div />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
