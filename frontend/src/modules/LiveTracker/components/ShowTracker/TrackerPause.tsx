import React from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';
import { useDurationTimer, usePauseTracker } from '../../hooks';
import { IconButtonTracker } from '../../helpers';
import { parseISO } from 'date-fns';

type TrackerPauseProps = {
  tracker: TrackerEntity;
};

export const TrackerPause = ({ tracker }: TrackerPauseProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { pauseTracker } = usePauseTracker();

  const duration = useDurationTimer(
    parseISO(tracker.attributes?.startLiveDate)
  );

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

  const [hours, minutes, seconds] = duration
    .split(/\D+/)
    .map((part) => parseInt(part));
  const durationMs = hours * 3600000 + minutes * 60000 + seconds * 1000;
  let pausedButton = false;
  if (durationMs < 60000) {
    pausedButton = true;
  }
  return (
    <>
      {isLiveStatusStart && (
        <IconButtonTracker onClick={handelPauseTracker} disabled={pausedButton}>
          <PauseIcon color={!pausedButton ? 'primary' : 'disabled'} />
        </IconButtonTracker>
      )}
    </>
  );
};
