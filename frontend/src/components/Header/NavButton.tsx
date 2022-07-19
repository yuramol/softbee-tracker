import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledLink } from '../../legos/StyledLink';

const HeaderButton = styled(Button)(({ theme }) => ({
  px: '15px',
  color: theme.palette.secondary.dark,
  fontWeight: '700',
}));

type NavButtonProps = { page: { href: string; name: string } };

export const NavButton = ({ page }: NavButtonProps) => (
  <StyledLink key={page.name} to={page.href}>
    <HeaderButton>{page.name}</HeaderButton>
  </StyledLink>
);
