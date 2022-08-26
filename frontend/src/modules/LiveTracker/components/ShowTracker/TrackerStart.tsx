import React from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';
import { useStartTracker } from '../../hooks';

type TrackerStartProps = {
  tracker: TrackerEntity;
};

export const TrackerStart = ({ tracker }: TrackerStartProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { startTracker } = useStartTracker();

  if (!tracker.attributes) return null;

  const isLiveStatusPause =
    tracker.attributes.live_status === Enum_Tracker_Live_Status.Pause;

  const handelStartTracker = () => {
    startTracker(tracker)
      .then(() => {
        enqueueSnackbar(`Tracker start`, { variant: 'success' });
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };
  return (
    <>
      {isLiveStatusPause && (
        <IconButton
          onClick={handelStartTracker}
          sx={{ borderRadius: 0, height: '2rem', width: '2rem' }}
        >
          <PlayArrowIcon color="primary" />
        </IconButton>
      )}
    </>
  );
};
