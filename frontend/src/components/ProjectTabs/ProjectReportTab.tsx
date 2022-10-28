import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { ReportTable } from '..';
import { getFormattedDate } from 'helpers';
import { useNormalizedTrackers, useNormalizedUsers } from 'hooks';
import { MultipleSelect, RangeCalendar } from 'legos';
import { TrackerAddNewEntry } from 'components/TrackerAddNewEntry';
import { reportRangeDates } from 'pages/ReportPage/helpers';
import { endOfMonth, startOfMonth } from 'date-fns';

type Props = {
  projectId: string;
};

export const ProjectReportTab = ({ projectId }: Props) => {
  const [selectedDates, setSelectedDates] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const { usersChoices } = useNormalizedUsers();

  const reportFilter = {
    ...(selectedEmployees.length > 0
      ? {
          user: {
            id: { in: selectedEmployees },
          },
        }
      : {}),
    project: {
      id: { in: [projectId] },
    },
    date:
      selectedDates.length > 1
        ? {
            between: [
              getFormattedDate(selectedDates[0]),
              getFormattedDate(selectedDates[1]),
            ],
          }
        : { eq: getFormattedDate(selectedDates[0]) },
  };

  const { fetchTrackers, normalizedTrackers } = useNormalizedTrackers(
    reportFilter,
    true
  );

  useEffect(() => {
    fetchTrackers({
      variables: { filters: reportFilter },
    });
  }, [selectedDates, selectedEmployees]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      <Grid xs={5} item>
        <RangeCalendar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          defaultRangeDates={reportRangeDates}
        />
      </Grid>
      <Grid item xs={5}>
        <MultipleSelect
          label="Employees"
          size="small"
          variant="outlined"
          items={usersChoices}
          value={selectedEmployees}
          setValue={setSelectedEmployees}
        />
      </Grid>
      <Grid item xs={2}>
        <TrackerAddNewEntry projectId={projectId} />
      </Grid>
      <Grid item xs={12}>
        <ReportTable trackers={normalizedTrackers} projectView />
      </Grid>
    </Grid>
  );
};
