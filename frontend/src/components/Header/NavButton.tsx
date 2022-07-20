import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from '../../legos';
import { theme } from '../../theme';

const HeaderButton = styled(Button)(() => ({
  px: '15px',
  color: theme.palette.common.grey,
  fontWeight: '700',
}));

type NavButtonProps = { page: { href: string; name: string } };

export const NavButton = ({ page }: NavButtonProps) => (
  <NavLink key={page.name} to={page.href}>
    <HeaderButton>{page.name}</HeaderButton>
  </NavLink>
);
