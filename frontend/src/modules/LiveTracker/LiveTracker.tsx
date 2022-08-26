import React from 'react';
import { Box, Stack } from '@mui/material';

import { useAuthUser } from 'hooks';

import { AddTracker, ShowTrackers } from './components';

export const LiveTracker = () => {
  const { user } = useAuthUser();

  if (!user) return null;
  return (
    <Box
      sx={{ position: 'fixed', bottom: 5, right: 5, zIndex: 9, height: '2rem' }}
    >
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <ShowTrackers userId={user.id} />
        <AddTracker userId={user.id} />
      </Stack>
    </Box>
  );
};
