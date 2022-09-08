import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { TrackerEntity } from 'types/GraphqlTypes';
import { ConfirmationDialog } from 'components';

import { useDeleteTracker } from '../../hooks';
import { IconButtonTracker } from '../../helpers';

type TrackerDeleteProps = {
  tracker: TrackerEntity;
};

export const TrackerDelete = ({ tracker }: TrackerDeleteProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { deleteTracker } = useDeleteTracker();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  if (!tracker.attributes) return null;

  const handelOpenConfirmationDialog = () => setConfirmationDialogOpen(true);
  const handelCloseConfirmationDialog = () => setConfirmationDialogOpen(false);
  const handelDeleteTracker = () => {
    deleteTracker(tracker)
      .then(() => {
        enqueueSnackbar(`Tracker deleted`, { variant: 'success' });
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => {
        handelCloseConfirmationDialog();
      });
  };
  return (
    <>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handelCloseConfirmationDialog}
        onConfirmation={handelDeleteTracker}
        text="Are you sure you want to delete this time entry?"
        title="Delete confirmation"
        buttonCloseTitle="Cancel"
        buttonConfirmationTitle="Delete"
      />
      <IconButtonTracker onClick={handelOpenConfirmationDialog}>
        <ClearIcon color="error" />
      </IconButtonTracker>
    </>
  );
};
