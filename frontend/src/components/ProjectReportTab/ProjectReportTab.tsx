import React, { useState } from 'react';
import { Button, Grid, Tooltip } from '@mui/material';
import { ReportTable, TrackerEntryModalForm } from '..';
import { getFormattedDate } from 'helpers';
import { useNormalizedTrackers, useNormalizedUsers } from 'hooks';
import { Icon, MultipleSelect, RangeCalendar } from 'legos';
import { useSnackbar } from 'notistack';
import { useCreateTracker } from 'modules';
import { TimeEntryValues } from 'components/TrackerEntryModalForm';
import { GraphQLError } from 'graphql';

type Props = {
  projectId: string;
};

export const ProjectReportTab = ({ projectId }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
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

  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handelSubmit = (values: TimeEntryValues) => {
    createTracker(values.EMPLOYEE as string, values)
      .then(() => {
        enqueueSnackbar(`Track added`, { variant: 'success' });
        toggleOpenModal();
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        <Grid xs={4} item>
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
          <TrackerEntryModalForm
            open={isOpenModal}
            onClose={toggleOpenModal}
            onSubmit={(values) => handelSubmit(values)}
            titleForm="New time entry"
            isManual={true}
            projectId={projectId}
            userId={''}
          />
          <Tooltip title="Add New Entry">
            <Button variant="contained" onClick={toggleOpenModal}>
              <Icon icon="add" />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <ReportTable trackers={trackers} />
        </Grid>
      </Grid>
    </>
  );
};
