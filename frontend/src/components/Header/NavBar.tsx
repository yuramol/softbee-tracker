import React from 'react';

import { Box } from '@mui/material';
import { pages } from '../../constants';
import { NavButton } from './NavButton';

export const NavBar = () => {
  return (
    <Box
      component="nav"
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex', justifyContent: 'right' },
      }}
    >
      {pages.map((page) => (
        <NavButton key={page.name} page={page} />
      ))}
    </Box>
  );
};
