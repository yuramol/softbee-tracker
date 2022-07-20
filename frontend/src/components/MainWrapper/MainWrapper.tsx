import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
type Props = {
  children: JSX.Element;
  sidebar?: JSX.Element;
};
export const MainWrapper = ({ children, sidebar }: Props) => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={sidebar ? 9 : 12}>
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
