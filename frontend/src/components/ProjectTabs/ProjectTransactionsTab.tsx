import React, { useState } from 'react';

import { Button, Grid, Tooltip } from '@mui/material';
import { ReportTable, TrackerEntryModalForm } from '..';
import { getFormattedDate } from 'helpers';
import { useNormalizedTrackers, useNormalizedUsers } from 'hooks';
import { Icon, MultipleSelect, RangeCalendar } from 'legos';
import { useSnackbar } from 'notistack';
import { useCreateTracker } from 'hooks/useCreateTracker';
import { TimeEntryValues } from 'components/TrackerEntryModalForm';
import { GraphQLError } from 'graphql';
import { format } from 'date-fns';
import { parseTrackerTime } from 'helpers';

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

  const initialValuesForm: TimeEntryValues = {
    date: new Date(),
    duration: 0,
    project: projectId,
  };

  const { normalizedTrackers } = useNormalizedTrackers(reportFilter);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handelSubmit = (values: TimeEntryValues) => {
    const data = {
      ...values,
      duration: values.duration,
      date: format(values.date, 'yyyy-MM-dd'),
    };
    createTracker(data)
      .then(() => {
        enqueueSnackbar(`Track added`, { variant: 'success' });
        toggleOpenModal();
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
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
        <TrackerEntryModalForm
          open={isOpenModal}
          onClose={toggleOpenModal}
          onSubmit={(values) => handelSubmit(values)}
          titleForm="New time entry"
          withEmployee={true}
          projectId={projectId}
          initialValuesForm={initialValuesForm}
        />
        <Tooltip title="Add New Entry">
          <Button variant="contained" onClick={toggleOpenModal}>
            <Icon icon="add" />
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <ReportTable trackers={normalizedTrackers} />
      </Grid>
    </Grid>
  );
};
