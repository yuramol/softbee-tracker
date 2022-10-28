import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { App } from 'App';
import { apolloClient } from 'api';
import { theme } from 'theme';
import { SnackBar } from 'components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <SnackBar>
          <CssBaseline />
          <App />
        </SnackBar>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
