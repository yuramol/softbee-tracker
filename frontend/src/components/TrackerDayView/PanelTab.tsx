import React from 'react';
import { Stack, Typography } from '@mui/material';

import { TrackerItem } from './TrackerItem';
import { parseTrackerTime } from 'helpers';
import { TrackerByDay } from 'hooks/useNormalizedTrackers';
import { getTotalTime } from 'helpers';
import { TrackerEntity } from 'types/GraphqlTypes';

type PanelTabProps = {
  trackersByDay: TrackerByDay | undefined;
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
          {trackersByDay.trackersByProject.map(({ trackers, name }) =>
            trackers.map(({ attributes, id }) => (
              <TrackerItem key={id} id={id} description={attributes?.description}
                    name={name} />
          ))
          )}
          <Typography variant="h6" borderTop={1} borderColor="gray" py={4}>
            Total: {trackersByDay.total}
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
