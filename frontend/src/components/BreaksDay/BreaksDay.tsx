import * as React from 'react';

import { Typography, Stack } from '@mui/material';
import { Icon } from 'legos';
type VacationDayProps = {
  description?: string;
  breaks?: string;
};
export const BreaksDay = ({ description, breaks }: VacationDayProps) => {
  const getBreackIcon: (type?: string) => JSX.Element | null = (type) => {
    switch (type) {
      case 'Vacation':
        return <Icon icon="sailing" />;
      case 'Unpaid':
        return <Icon icon="moneyOff" />;
      case 'Sickness':
        return <Icon icon="medicalServices" />;
      default:
        return null;
    }
  };
  return (
    <Stack>
      <Stack direction="row" spacing={2}>
        {getBreackIcon(breaks)}

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
