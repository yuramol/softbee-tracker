import * as React from 'react';
import { Typography, Stack } from '@mui/material';

import { getBreakIcon } from './getBreakIcon';
import { Enum_Tracker_Status, Maybe } from 'types/GraphqlTypes';

type VacationDayProps = {
  description?: string;
  breaks?: string;
  status?: Maybe<Enum_Tracker_Status>;
};
export const BreaksDay = ({
  description,
  breaks,
  status,
}: VacationDayProps) => (
  <Stack>
    <Stack direction="row" spacing={2}>
      {getBreakIcon(breaks)}
      <Typography ml={0.5} fontWeight={600}>
        {breaks}
      </Typography>
      <Typography ml={0.5} fontStyle="italic">
        {status === 'approved'
          ? 'Approved'
          : status === 'new'
          ? 'On the check'
          : 'Rejected'}
      </Typography>
    </Stack>

    {description && (
      <Typography ml={0.5} fontWeight={400}>
        {description}
      </Typography>
    )}
  </Stack>
);
