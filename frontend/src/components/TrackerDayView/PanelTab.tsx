import React from 'react';
import { Stack, Typography } from '@mui/material';

import { ProjectItem } from './ProjectItem';
import { getTotalTime, parseTrackerTime } from '../../helpers';
import { TrackerEntity } from '../../types/GraphqlTypes';

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
        <Stack mt="-2px" mb={4} borderTop="2px solid gray">
          {dataTabs.map(({ attributes, id }) => {
            const trackerTime = parseTrackerTime(attributes?.duration);
            if (trackerTime) {
              return (
                <ProjectItem
                  key={id}
                  id={id}
                  attributes={attributes}
                  trackerTime={trackerTime}
                />
              );
            }
          })}
          <Typography variant="h6" py={4} px={2} borderTop="1px solid gray">
            Total: {totalTime}
          </Typography>
        </Stack>
      );
    }

    return (
      <Typography
        variant="h6"
        mt="-2px"
        mb={4}
        py={4}
        px={2}
        borderTop="2px solid gray"
      >
        Not tracked this day
      </Typography>
    );
  }

  return null;
};
