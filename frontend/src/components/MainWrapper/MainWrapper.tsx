import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

export const MainWrapper = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={9}></Grid>
        <Grid item md={3}></Grid>
      </Grid>
    </Container>
  );
};
