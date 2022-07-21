import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { Loader } from '../components';
import {
  PublicLayout,
  EmployeeLayout,
  ManagerLayout,
} from '../components/Layout';
import { publicPages, employeePages, managerPages } from '../constants';
import { NotFoundPage } from '../pages';

export const AppRouter = () => {
  const { user } = useAuth();

  if (user === true) return <Loader />;

  const userRole = user && user.role && user.role.type;

  let Layout = <PublicLayout />;
  let pages = publicPages;

  switch (userRole) {
    case 'employee':
      Layout = <EmployeeLayout />;
      pages = employeePages;
      break;
    case 'manager':
      Layout = <ManagerLayout />;
      pages = managerPages;
      break;
    default:
      break;
  }

  return (
    <Routes>
      <Route element={Layout}>
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
