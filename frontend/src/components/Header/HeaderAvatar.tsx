import React from 'react';
import { Box, IconButton, Menu, Tooltip, MenuItem } from '@mui/material';

import { HeaderButton, NavButton } from './NavButton';
import { HeaderProps } from './types';
import { useAuth } from '../../AuthProvider';
import { useUsersPermissionsUser } from 'hooks';
import { UniversalAvatar } from 'legos';

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
  const { user, logout } = useAuth();
  const { userPermission } = useUsersPermissionsUser(user.id);

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
          <UniversalAvatar
            width="40px"
            height="40px"
            name={`${userPermission?.firstName} ${userPermission?.lastName}`}
            avatar={`https://dev.strapi.track.softbee.io${userPermission?.avatar.data?.attributes?.url}`}
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
        <MenuItem
          onClick={(e) => {
            handleCloseUserMenu(e);
            logout();
          }}
        >
          <HeaderButton>Logout</HeaderButton>
        </MenuItem>
      </Menu>
    </Box>
  );
};
