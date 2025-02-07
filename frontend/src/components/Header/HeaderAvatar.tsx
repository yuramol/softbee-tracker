import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';

import { NavButton } from './NavButton';
import { HeaderProps } from './types';
import { useAuthUser, useUser } from 'hooks';
import { Avatar } from 'legos';
import { theme } from 'theme';

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
  const { isAuth, user, logout } = useAuthUser();
  const { userData } = useUser(user.id);
  const pathAvatar = userData?.avatar?.data?.attributes?.url
    ? `${process.env.REACT_APP_URI}${userData?.avatar?.data?.attributes?.url}`
    : '';

  return isAuth && userData ? (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <Tooltip
        title={
          <Box display="flex" flexDirection="column" textAlign="center">
            <Typography variant="body2">{`${userData.firstName} ${userData.lastName}`}</Typography>
            <Typography variant="body2">{userData.email}</Typography>
          </Box>
        }
      >
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            width={40}
            height={40}
            firstName={userData.firstName}
            lastName={userData.lastName}
            avatar={pathAvatar}
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
          sx={{ justifyContent: 'center' }}
          onClick={(e) => {
            handleCloseUserMenu(e);
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
      </Menu>
    </Box>
  ) : null;
};
