import React from 'react';
import { Typography } from '@mui/material';
import { parseISO } from 'date-fns';

import { TrackerEntity } from 'types/GraphqlTypes';
import { useDurationTimer } from '../../hooks';

type TrackerStartShowTimeProps = {
  tracker: TrackerEntity;
};

export const TrackerStartShowTime = ({
  tracker,
}: TrackerStartShowTimeProps) => {
  const duration = useDurationTimer(
    parseISO(tracker.attributes?.startLiveDate)
  );
  if (!tracker.attributes) return null;

  return <Typography variant="body2">{duration}</Typography>;
};
