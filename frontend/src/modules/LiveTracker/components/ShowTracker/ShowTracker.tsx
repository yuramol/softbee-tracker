import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';

import { TrackerPause } from './TrackerPause';
import { TrackerStart } from './TrackerStart';
import { TrackerSave } from './TrackerSave';
import { TrackerPauseShowTime } from './TrackerPauseShowTime';
import { TrackerStartShowTime } from './TrackerStartShowTime';
import { TrackerDelete } from './TrackerDelete';

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
          boxShadow: '0px 0px 23px 1px rgba(120,120,120,0.75)',
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
          <TrackerDelete tracker={tracker} />
        </Stack>
      </Paper>
    </>
  );
};
