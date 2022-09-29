import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { ReportTable } from '..';
import { getFormattedDate } from 'helpers';
import { useNormalizedTrackers, useNormalizedUsers } from 'hooks';
import { MultipleSelect, RangeCalendar } from 'legos';
import { useSnackbar } from 'notistack';
import { useCreateTracker } from 'hooks/useCreateTracker';
import { GraphQLError } from 'graphql';
import { format } from 'date-fns';
import { TransactionEntryValues } from 'components/TransactionEntryModalForm';
import { AddNewTransaction } from 'components/AddNewTransaction';

type Props = {
  projectId: string;
};

export const ProjectTransactionsTab = ({ projectId }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([
    getFormattedDate(new Date()),
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const { usersChoices } = useNormalizedUsers();

  const reportFilter = {
    user: {
      id: selectedEmployees.length !== 0 ? { in: selectedEmployees } : {},
    },
    project: {
      id: { in: [projectId] },
    },
    date:
      selectedDates.length > 1
        ? { between: selectedDates }
        : { eq: selectedDates[0] },
  };

  const { normalizedTrackers } = useNormalizedTrackers(reportFilter);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

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
        <AddNewTransaction />
      </Grid>
      <Grid item xs={12}>
        <ReportTable trackers={normalizedTrackers} />
      </Grid>
    </Grid>
  );
};
