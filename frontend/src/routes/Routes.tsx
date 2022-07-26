import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../AuthProvider';
import { Loader, Layout } from '../components';
import { NotFoundPage } from '../pages';
import { Role, pages } from '../constants';

export const AppRouter = () => {
  const { user } = useAuth();

  if (user === true) return <Loader />;
  if (user && user.role === null) return <Loader />;

  const userRole = user && user.role ? user.role.type : Role.Public;
  const currentPages = pages.filter(({ role }) => role.includes(userRole));

  return (
    <Routes>
      <Route element={<Layout pages={currentPages} />}>
        <Route
          path="*"
          element={user ? <NotFoundPage /> : <Navigate to="/login" replace />}
        />
        {currentPages.map(({ index, name, href, Component }) => (
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
