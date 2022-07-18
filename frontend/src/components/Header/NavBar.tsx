import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import { pages } from '../../constants';

export const NavBar = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex', justifyContent: 'right' },
      }}
    >
      {pages.map((page) => (
        <Link
          key={page.name}
          to={page.href}
          style={{ textDecoration: 'unset' }}
        >
          <Button
            sx={{
              px: '15px',
              color: '#3b4649',
              fontWeight: '700',
            }}
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
};
