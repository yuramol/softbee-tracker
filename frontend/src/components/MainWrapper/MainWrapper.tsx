import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
type Props = {
  children: React.ReactNode;
  sidebar?: JSX.Element;
  left?: boolean;
};
export const MainWrapper = ({ children, sidebar, left }: Props) => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item order={left ? 1 : 'unset'} md={sidebar ? 9 : 12}>
          {children}
        </Grid>
        {sidebar && (
          <Grid item md={3}>
            {sidebar}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
