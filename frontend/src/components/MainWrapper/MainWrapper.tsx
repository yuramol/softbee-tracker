import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

type Props = {
  children: React.ReactNode;
  sidebar?: JSX.Element;
  left?: boolean;
  loginPage?: boolean;
};

export const MainWrapper: React.FC<Props> = ({
  children,
  sidebar,
  left,
  loginPage,
}) => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ paddingY: 4, height: '100%' }}
    >
      <Grid container height="100%">
        <Grid
          item
          height="100%"
          order={left ? 1 : 'unset'}
          md={sidebar ? 9 : 12}
          paddingRight={sidebar ? 6 : 0}
          sx={
            loginPage
              ? {
                  m: 'auto',
                  width: '100%',
                  maxWidth: '500px',
                }
              : {}
          }
        >
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
