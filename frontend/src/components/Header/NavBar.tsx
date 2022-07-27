import React from 'react';
import { Box } from '@mui/material';

import { NavButton } from './NavButton';
import { HeaderProps } from './types';

export const NavBar: React.FC<HeaderProps> = ({ pages }) => {
  return (
    <Box
      component="nav"
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex', justifyContent: 'right' },
      }}
    >
      {pages.map((page) => (
        <NavButton key={page.name} {...page} />
      ))}
    </Box>
  );
};
