import React, { useState } from 'react';

import { Scalars } from 'types/GraphqlTypes';
import { Button, Tooltip, Typography } from '@mui/material';
import { Icon } from 'legos';
import { TrackerEntryModalForm } from 'components';
import { TimeEntryValues } from 'components/TrackerEntryModalForm';
import { GraphQLError } from 'graphql';
import { useSnackbar } from 'notistack';
import { useCreateTracker } from 'hooks/useCreateTracker';
import { format } from 'date-fns';
import { parseTrackerTime } from 'helpers';

type Props = {
  projectId: Scalars['ID'];
};
export const ProjectReport = ({ projectId }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const initialValuesForm: TimeEntryValues = {
    date: new Date(),
    duration: '00:00',
    project: projectId,
  };

  const handelSubmit = (values: TimeEntryValues) => {
    const data = {
      ...values,
      duration: format(
        parseTrackerTime(values.duration, 'HH:mm'),
        'HH:mm:ss.SSS'
      ),
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
    <>
      <Typography>Add report</Typography>
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
    </>
  );
};
