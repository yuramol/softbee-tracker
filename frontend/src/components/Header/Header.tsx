import React, { useState } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { MenuAppBar } from './MenuAppBar';
import { HeaderAvatar } from './HeaderAvatar';
import { Logo } from './Logo';
import { NavBar } from './NavBar';
import { HeaderProps } from './types';
import { useAuth } from '../../AuthProvider';

export const Header: React.FC<HeaderProps> = ({ pages }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const { user } = useAuth();
  const mainMenuPages = pages.filter(({ mainMenu }) => mainMenu);
  const avatarMenuPages = pages.filter(({ mainMenu }) => !mainMenu);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'common.lightBackground',
        boxShadow: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <MenuAppBar
            pages={mainMenuPages}
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />
          <Logo />
          <NavBar pages={mainMenuPages} />
          {user && (
            <HeaderAvatar
              pages={avatarMenuPages}
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
