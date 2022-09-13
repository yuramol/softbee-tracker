import React, { FC } from 'react';
import { SnackbarProvider } from 'notistack';
import { styled } from '@mui/material';

import { theme } from 'theme';

type Props = { children: React.ReactNode };

export const StyledSnackbarProvider = styled(SnackbarProvider)(() => ({
  '&.SnackbarItem-variantSuccess': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const SnackBar: FC<Props> = ({ children }) => (
  <StyledSnackbarProvider maxSnack={3} autoHideDuration={2500}>
    {children}
  </StyledSnackbarProvider>
);
