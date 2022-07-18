import React from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Menu, MenuItem, Button, Box } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { pages } from '../../constants';

type MenuAppBarProps = {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
};

export const MenuAppBar = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}: MenuAppBarProps) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseNavMenu}>
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
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
