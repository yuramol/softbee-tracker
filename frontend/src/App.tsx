import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';

import { AuthProvider } from './AuthProvider';
import { AppRouter } from './routes';

const globalStyles = `{
  html: {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    height: '100%',
    width: '100%',
  },
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  body: {
    height: '100%',
    width: '100%',
  },
  '#root': {
    height: '100%',
    width: '100%',
  },
}`;

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
