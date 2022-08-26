import React from 'react';
import { IconButton, Paper, Stack, styled, Typography } from '@mui/material';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';

import { TrackerPause } from './TrackerPause';
import { TrackerStart } from './TrackerStart';
import { TrackerSave } from './TrackerSave';
import { TrackerPauseShowTime } from './TrackerPauseShowTime';
import { TrackerStartShowTime } from './TrackerStartShowTime';

type ShowTrackerProps = {
  tracker: TrackerEntity;
  userId: string;
};

export const ShowTracker = ({ tracker, userId }: ShowTrackerProps) => {
  if (!tracker.attributes) return null;

  const isLiveStatusStart =
    tracker.attributes.live_status === Enum_Tracker_Live_Status.Start;
  const isLiveStatusPause =
    tracker.attributes.live_status === Enum_Tracker_Live_Status.Pause;
  return (
    <>
      <Paper
        sx={{
          height: '2rem',
        }}
      >
        <Stack
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TrackerPause tracker={tracker} />
          <TrackerStart tracker={tracker} />
          <Typography sx={{ fontWeight: 600 }} variant="body1">
            {tracker.attributes.project?.data?.attributes?.name}
          </Typography>
          {isLiveStatusPause && <TrackerPauseShowTime tracker={tracker} />}
          {isLiveStatusStart && <TrackerStartShowTime tracker={tracker} />}
          <TrackerSave tracker={tracker} userId={userId} />
        </Stack>
      </Paper>
    </>
  );
};

export const IconButtonTracker = styled(IconButton)(() => ({
  borderRadius: 0,
  height: '2rem',
  width: '2rem',
}));
