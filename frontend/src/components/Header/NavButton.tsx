import React from 'react';
import { Button } from '@mui/material';
import { NavLink, PulseDot } from 'legos';
import { theme } from 'theme';
import { Page } from './types';
import { useNormalizedTrackers } from 'hooks';
import { Enum_Tracker_Status } from 'types/GraphqlTypes';

export const NavButton: React.FC<Page> = ({ name, href }) => {
  const { normalizedTrackers } = useNormalizedTrackers(
    {
      status: { eq: Enum_Tracker_Status.New },
    },
    true
  );

  return (
    <NavLink to={href} disabled={name === 'Register' ? true : false}>
      <Button
        sx={{
          px: '15px',
          color: theme.palette.common.grey,
          fontWeight: '700',
        }}
      >
        {name}

        {name === 'Crew' && normalizedTrackers.length > 0 ? <PulseDot /> : null}
      </Button>
    </NavLink>
  );
};
