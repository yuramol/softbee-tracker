import React from 'react';

import { TrackerEntity } from '../../types/GraphqlTypes';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format, parse } from 'date-fns';
import { useTotalTime } from '../../hooks';
import { TabProject } from './TabProject';

type Props = {
  dataTabs: TrackerEntity[] | undefined;
  value: number;
  index: number;
};
export const TabPanel = ({ dataTabs, index, value }: Props) => {
  const { totalTime } = useTotalTime(dataTabs);

  if (value === index) {
    if (dataTabs && dataTabs?.length > 0) {
      return (
        <Box sx={{ mt: '-2px' }}>
          {dataTabs.map(({ attributes, id }, i) => {
            const parseTime = parse(
              attributes?.duration,
              'HH:mm:ss.SSS',
              new Date()
            );
            if (!isNaN(parseTime.getTime())) {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    p: '15px',
                    borderTop: '2px solid gray',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  key={i}
                >
                  <TabProject
                    id={id}
                    attributes={attributes}
                    parseTime={parseTime}
                  />
                </Box>
              );
            }
          })}
          <Typography
            variant="h6"
            sx={{ p: '15px', borderTop: '2px solid gray' }}
          >
            Total: {totalTime}
          </Typography>
        </Box>
      );
    }
    return (
      <Typography
        sx={{
          p: '15px',
          mt: '-2px',
          borderTop: '2px solid gray',
        }}
        variant="h6"
      >
        not tracked this day
      </Typography>
    );
  }
  return null;
};
