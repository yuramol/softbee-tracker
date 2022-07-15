import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
type Props = {
  content: JSX.Element;
  sidebar: JSX.Element;
};
export const MainWrapper = ({ content, sidebar }: Props) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={9}>
          {content}
        </Grid>
        <Grid item md={3}>
          {sidebar}
        </Grid>
      </Grid>
    </Container>
  );
};
