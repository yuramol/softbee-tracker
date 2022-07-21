import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { HeaderButton, NavButton } from './NavButton';
import { HeaderProps } from './types';

interface HeaderAvatarProps extends HeaderProps {
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export const HeaderAvatar: React.FC<HeaderAvatarProps> = ({
  pages,
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{
            ml: '30px',
            maxWidth: '40px',
            maxHeight: '40px',
          }}
        >
          <Avatar
            alt="User avatar"
            src="https://i.pravatar.cc/300
"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseUserMenu}>
            <NavButton {...page} />
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu}>
          <HeaderButton>Logout</HeaderButton>
        </MenuItem>
      </Menu>
    </Box>
  );
};
