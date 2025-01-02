import React from 'react';
import { IconButton, Menu, MenuItem, Box, Button } from '@mui/material';

import { NavButton } from './NavButton';
import { HeaderProps } from './types';
import { Icon } from 'legos';
import { theme } from 'theme';
import { useAuthUser } from 'hooks';

import { pages as constPages } from 'constant';

interface MenuAppBarProps extends HeaderProps {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export const MenuAppBar: React.FC<MenuAppBarProps> = ({
  pages,
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}) => {
  const { isAuth, user, logout } = useAuthUser();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        <Icon icon="menu" />
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
        {isAuth &&
          user &&
          pages.map((page) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
              <NavButton {...page} />
            </MenuItem>
          ))}
        {isAuth ? (
          <MenuItem
            onClick={(e) => {
              handleCloseNavMenu(e);
              logout();
            }}
          >
            <Button
              sx={{
                px: '15px',
                color: theme.palette.common.grey,
                fontWeight: '700',
              }}
            >
              Logout
            </Button>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleCloseNavMenu}>
            <NavButton {...constPages[0]} />
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
