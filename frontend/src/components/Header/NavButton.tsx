import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, PulseDot } from 'legos';
import { theme } from 'theme';
import { Page } from './types';
import { useNormalizedTrackers } from 'hooks';
import { Enum_Tracker_Status } from 'types/GraphqlTypes';

export const HeaderButton = styled(Button)(() => ({
  px: '15px',
  color: theme.palette.common.grey,
  fontWeight: '700',
}));

export const NavButton: React.FC<Page> = ({ name, href }) => {
  const { normalizedTrackers } = useNormalizedTrackers(
    {
      status: { eq: Enum_Tracker_Status.New },
    },
    true
  );

  return (
    <NavLink key={name} to={href} style={{ position: 'relative' }}>
      <HeaderButton>
        {name}
        {name === 'Crew' && normalizedTrackers.length > 0 ? <PulseDot /> : null}
      </HeaderButton>
    </NavLink>
  );
};
