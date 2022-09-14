import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { ReportTable } from '..';
import { getFormattedDate } from 'helpers';
import { useNormalizedTrackers, useNormalizedUsers } from 'hooks';
import { Icon, MultipleSelect, RangeCalendar } from 'legos';

export const ReportProjectPage = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([
    getFormattedDate(new Date()),
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const { usersChoices } = useNormalizedUsers();

  const reportFilter = {
    user: {
      id: selectedEmployees.length !== 0 ? { in: selectedEmployees } : {},
    },
    project: {
      id: { in: ['2'] },
    },
    date:
      selectedDates.length > 1
        ? { between: selectedDates }
        : { eq: selectedDates[0] },
  };

  const { trackers } = useNormalizedTrackers(reportFilter);

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={4}>
          <RangeCalendar
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </Grid>
        <Grid item xs={7}>
          <MultipleSelect
            label="Employees"
            size="small"
            variant="outlined"
            items={usersChoices}
            value={selectedEmployees}
            setValue={setSelectedEmployees}
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained">
            <Icon icon="add" />
          </Button>
        </Grid>
      </Grid>
      <ReportTable trackers={trackers} />
    </Box>
  );
};
