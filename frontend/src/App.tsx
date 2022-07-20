import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import { AuthProvider } from './AuthProvider';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};
