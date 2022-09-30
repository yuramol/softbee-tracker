import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { useAuthUser, useCreateTracker } from 'hooks';
import { Icon } from 'legos';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import { format } from 'date-fns';
import { TIME_ENTRY_FIELDS } from 'components/TrackerEntryModalForm/TrackerEntryForm';

type Props = {
  currentDay?: Date;
  projectId?: string;
};

export const TrackerAddNewEntry = ({
  currentDay = new Date(),
  projectId = '',
}: Props) => {
  const { user } = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const initialValuesForm = {
    [TIME_ENTRY_FIELDS.DATE]: currentDay,
    [TIME_ENTRY_FIELDS.DURATION]: 0,
    [TIME_ENTRY_FIELDS.PROJECT]: projectId,
  };

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handelSubmit = (values: TimeEntryValues) => {
    const data = {
      ...values,
      date: format(values.date, 'yyyy-MM-dd'),
    };

    createTracker(data)
      .then(() => {
        enqueueSnackbar(`Track added`, { variant: 'success' });
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });

    toggleOpenModal();
  };

  return (
    <>
      <TrackerEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
        titleForm="New time entry"
        userId={user.id}
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
