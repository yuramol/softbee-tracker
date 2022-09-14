import { Box, Button, Grid, Stack } from '@mui/material';
import { getFormattedDate } from 'helpers';
import { useNormalizedUsers } from 'hooks';
import { Icon, MultipleSelect, RangeCalendar } from 'legos';
import React, { useState } from 'react';

export const ProjectReportPage = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([
    getFormattedDate(new Date()),
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const { usersChoices } = useNormalizedUsers();
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
    </Box>
  );
};
