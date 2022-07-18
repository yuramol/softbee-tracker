import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

type NavButtonProps = { page: { href: string; name: string } };
export const NavButton = ({ page }: NavButtonProps) => (
  <Link key={page.name} to={page.href} style={{ textDecoration: 'unset' }}>
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
);
