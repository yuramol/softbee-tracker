import React from 'react';
import { Typography } from '@mui/material';

import { TrackerEntity } from 'types/GraphqlTypes';
import {
  intervalDateSeconds,
  secondsToHmsHumanFormat,
} from 'modules/LiveTracker/helpers';
import { subMinutes } from 'date-fns';

type TrackerPauseShowTimeProps = {
  tracker: TrackerEntity;
};

export const TrackerPauseShowTime = ({
  tracker,
}: TrackerPauseShowTimeProps) => {
  if (!tracker.attributes) return null;

  const startDate = subMinutes(
    new Date(),
    tracker.attributes?.liveDurationMinutes
  );
  const seconds = intervalDateSeconds({ endDate: startDate });

  return (
    <Typography variant="body2">{secondsToHmsHumanFormat(seconds)}</Typography>
  );
};
