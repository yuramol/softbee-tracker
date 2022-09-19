import React, { useState } from 'react';

import { Scalars } from 'types/GraphqlTypes';
import { Button, Tooltip, Typography } from '@mui/material';
import { Icon } from 'legos';
import { TrackerEntryModalForm } from 'components';
import { TimeEntryValues } from 'components/TrackerEntryModalForm';
import { GraphQLError } from 'graphql';
import { useCreateTracker } from 'modules';
import { useSnackbar } from 'notistack';

type Props = {
  id: Scalars['ID'];
};
export const ProjectReport = ({ id }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();
  const [isOpenModal, setIsOpenModal] = useState(false);

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
      <Typography>Add report</Typography>
      <TrackerEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
        titleForm="New time entry"
        isManual={true}
        projectId={id}
        userId={''}
      />
      <Tooltip title="Add New Entry">
        <Button variant="contained" onClick={toggleOpenModal}>
          <Icon icon="add" />
        </Button>
      </Tooltip>
    </>
  );
};
