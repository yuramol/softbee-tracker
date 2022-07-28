import React from 'react';
import { Grid, Typography } from '@mui/material';

import { ProjectTab } from './ProjectTab';
import { getTotalTime, parseTrackerTime } from '../../helpers';
import { TrackerEntity } from '../../types/GraphqlTypes';

type Props = {
  dataTabs: TrackerEntity[] | undefined;
  value: number;
  index: number;
};

export const PanelTab = ({ dataTabs, index, value }: Props) => {
  const totalTime = getTotalTime(dataTabs);

  if (value === index) {
    if (dataTabs && dataTabs?.length > 0) {
      return (
        <Grid marginTop="-2px" borderTop="2px solid gray">
          {dataTabs.map(({ attributes, id }, i) => {
            const trackerTime = parseTrackerTime(attributes?.duration);
            if (trackerTime) {
              return (
                <Grid
                  key={i}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="24px 16px"
                  borderTop={i !== 0 ? '1px solid gray' : 'none'}
                >
                  <ProjectTab
                    id={id}
                    attributes={attributes}
                    trackerTime={trackerTime}
                  />
                </Grid>
              );
            }
          })}
          <Typography
            variant="h6"
            padding="24px 16px"
            borderTop="2px solid gray"
          >
            Total: {totalTime}
          </Typography>
        </Grid>
      );
    }

    return (
      <Typography
        variant="h6"
        marginTop="-2px"
        padding="24px 16px"
        borderTop="2px solid gray"
      >
        Not tracked this day
      </Typography>
    );
  }

  return null;
};
