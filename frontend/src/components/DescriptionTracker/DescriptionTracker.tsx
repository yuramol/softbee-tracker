import { Typography } from '@mui/material';
import React, { FC } from 'react';
interface DescriptionTrackerProps {
  tracker: string;
  projectView?: boolean;
}
export const DescriptionTracker: FC<DescriptionTrackerProps> = ({
  tracker,
  projectView,
}) => {
  const textArray = tracker.split('\n');

  return (
    <>
      {textArray?.map((text, index) => (
        <Typography
          fontWeight={projectView ? '600' : '400'}
          key={index}
          component="span"
          variant="body1"
        >
          {text}
          <br />
        </Typography>
      ))}
    </>
  );
};
