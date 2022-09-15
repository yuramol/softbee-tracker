import React from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';
import { usePauseTracker } from '../../hooks';
import { IconButtonTracker } from '../../helpers';

type TrackerPauseProps = {
  tracker: TrackerEntity;
};

export const TrackerPause = ({ tracker }: TrackerPauseProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { pauseTracker } = usePauseTracker();

  if (!tracker.attributes) return null;
  const isLiveStatusStart =
    tracker.attributes.live_status === Enum_Tracker_Live_Status.Start;

  const handelPauseTracker = () => {
    pauseTracker(tracker)
      .then(() => {
        enqueueSnackbar(`Tracker paused`, { variant: 'success' });
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };
  return (
    <>
      {isLiveStatusStart && (
        <IconButtonTracker onClick={handelPauseTracker}>
          <PauseIcon color="primary" />
        </IconButtonTracker>
      )}
    </>
  );
};
