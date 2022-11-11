import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { TrackerItem } from './TrackerItem';
import { TrackerByDay } from 'hooks/useNormalizedTrackers';
import { getHours } from 'helpers';

type PanelTabProps = {
  trackersByDay?: TrackerByDay;
  value: number;
  index: number;
};

export const PanelTab: React.FC<PanelTabProps> = ({
  trackersByDay,
  index,
  value,
}) => {
  if (value === index) {
    if (trackersByDay) {
      return (
        <Stack>
          {trackersByDay.trackersByProject.map(({ trackers }) =>
            trackers.map((tracker) => (
              <TrackerItem key={tracker.id} tracker={tracker} id={tracker.id} />
            ))
          )}
          <Typography variant="h6" borderTop={1} borderColor="gray" py={4}>
            Total: {getHours(trackersByDay.total)}
          </Typography>
        </Stack>
      );
    }

    return (
      <Typography
        variant="h6"
        borderBottom={2}
        borderColor="gray"
        py={4}
        mb={4}
      >
        Not tracked this day
      </Typography>
    );
  }

  return null;
};
