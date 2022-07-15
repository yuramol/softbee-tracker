import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

export const MainWrapper = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={9} md={8}></Grid>
        <Grid item xs={3} md={4}></Grid>
      </Grid>
    </Container>
  );
};
