import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';

import { AuthProvider } from './AuthProvider';
import { AppRouter } from './routes';
import { globalStyles } from 'theme/globalStyles';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles styles={globalStyles} />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};
