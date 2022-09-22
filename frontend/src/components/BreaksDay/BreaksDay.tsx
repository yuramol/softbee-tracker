import * as React from 'react';

import { Typography, Stack } from '@mui/material';
import { getBreakIcon } from './getBreakIcon';
type VacationDayProps = {
  description?: string;
  breaks?: string;
};
export const BreaksDay = ({ description, breaks }: VacationDayProps) => {
  return (
    <Stack>
      <Stack direction="row" spacing={2}>
        {getBreakIcon(breaks)}
        <Typography ml={0.5} fontWeight={600}>
          {breaks}
        </Typography>
      </Stack>

      {description && (
        <Typography ml={0.5} fontWeight={400}>
          {description}
        </Typography>
      )}
    </Stack>
  );
};
