import React from 'react';
import { Box, Stack } from '@mui/material';

import { useAuth } from 'AuthProvider';

import { AddTracker, ShowTrackers } from './components';

export const LiveTracker = () => {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <Box sx={{ position: 'fixed', bottom: 5, right: 5 }}>
      <Stack direction="row" spacing={1}>
        <ShowTrackers userId={user.id} />
        <AddTracker userId={user.id} />
      </Stack>
    </Box>
  );
};
