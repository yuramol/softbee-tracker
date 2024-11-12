import React from 'react';
import { Container } from '@mui/system';
import { Grid, useMediaQuery } from '@mui/material';

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
  const lgScreen = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

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
          lg={sidebar ? 9 : 12}
          paddingRight={sidebar ? { lg: 6 } : 0}
          width="100%"
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
        {sidebar && lgScreen ? (
          <Grid item md={3}>
            {sidebar}
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};
