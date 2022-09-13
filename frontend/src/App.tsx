import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';

import { AppRouter } from './routes';
import { globalStyles } from 'theme/globalStyles';

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles styles={globalStyles} />
      <AppRouter />
    </BrowserRouter>
  );
};
