import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from '../../legos';
import { theme } from '../../theme';
import { Page } from './types';

export const HeaderButton = styled(Button)(() => ({
  px: '15px',
  color: theme.palette.common.grey,
  fontWeight: '700',
}));

export const NavButton: React.FC<Page> = ({ name, href }) => {
  return (
    <NavLink key={name} to={href}>
      <HeaderButton>{name}</HeaderButton>
    </NavLink>
  );
};
