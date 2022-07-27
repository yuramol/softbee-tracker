import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './AuthProvider';
import { AppRouter } from './routes';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};
