import React from 'react';
import { Box } from '@mui/material';

import { NavButton } from './NavButton';
import { HeaderProps } from './types';

export const NavBar: React.FC<HeaderProps> = ({ pages }) => {
  return (
    <Box
      component="nav"
      width="100%"
      justifyContent="right"
      sx={{
        display: { xs: 'none', md: 'flex' },
      }}
    >
      {pages.map((page) => (
        <NavButton key={page.name} {...page} />
      ))}
    </Box>
  );
};
