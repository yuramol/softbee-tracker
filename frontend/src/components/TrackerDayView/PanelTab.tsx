import React from 'react';
import { Stack, Typography } from '@mui/material';

import { TrackerItem } from './TrackerItem';
import { getTotalTime, parseTrackerTime } from 'helpers';
import { TrackerEntity } from 'types/GraphqlTypes';

type Props = {
  dataTabs: TrackerEntity[] | undefined;
  value: number;
  index: number;
};

export const PanelTab: React.FC<Props> = ({ dataTabs, index, value }) => {
  const totalTime = getTotalTime(dataTabs);

  if (value === index) {
    if (dataTabs && dataTabs?.length > 0) {
      return (
        <Stack>
          {dataTabs.map(({ attributes, id }) => {
            const trackerTime = parseTrackerTime(attributes?.duration);
            if (trackerTime) {
              return (
                <TrackerItem
                  key={id}
                  id={id}
                  attributes={attributes}
                  trackerTime={trackerTime}
                />
              );
            }
          })}
          <Typography variant="h6" borderTop={1} borderColor="gray" py={4}>
            Total: {totalTime}
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
