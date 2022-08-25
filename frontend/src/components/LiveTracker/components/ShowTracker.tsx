import React from 'react';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Enum_Tracker_Livestatus, TrackerEntity } from 'types/GraphqlTypes';
import { Box } from '@mui/system';
import { parseISO } from 'date-fns';
import { useDurationTimer } from '../hooks';

type ShowTrackerProps = {
  tracker: TrackerEntity;
};

export const ShowTracker = ({ tracker }: ShowTrackerProps) => {
  const duration = useDurationTimer(
    parseISO(tracker.attributes?.startLiveDate ?? new Date().toString())
  );
  if (!tracker.attributes) return null;
  const isLiveStatusStart =
    tracker.attributes.liveStatus === Enum_Tracker_Livestatus.Start;
  const isLiveStatusPause =
    tracker.attributes.liveStatus === Enum_Tracker_Livestatus.Pause;
  return (
    <>
      <Paper
        sx={{
          height: '3rem',
        }}
      >
        <Stack spacing={1}>
          {isLiveStatusStart && (
            <IconButton sx={{ borderRadius: 0 }}>
              <PauseIcon fontSize="large" color="primary" />
            </IconButton>
          )}
          {isLiveStatusPause && (
            <IconButton sx={{ borderRadius: 0 }}>
              <PlayArrowIcon fontSize="large" color="primary" />
            </IconButton>
          )}
          <Box>
            {isLiveStatusStart && (
              <Typography variant="body1">{duration}</Typography>
            )}
          </Box>
        </Stack>
      </Paper>
    </>
  );
};
