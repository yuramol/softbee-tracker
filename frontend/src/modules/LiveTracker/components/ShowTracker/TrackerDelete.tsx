import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { TrackerEntity } from 'types/GraphqlTypes';
import { useDeleteTracker } from '../../hooks';
import { IconButtonTracker } from '../../helpers';

type TrackerDeleteProps = {
  tracker: TrackerEntity;
};

export const TrackerDelete = ({ tracker }: TrackerDeleteProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { deleteTracker } = useDeleteTracker();

  if (!tracker.attributes) return null;

  const handelDeleteTracker = () => {
    deleteTracker(tracker)
      .then(() => {
        enqueueSnackbar(`Tracker deleted`, { variant: 'success' });
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };
  return (
    <IconButtonTracker onClick={handelDeleteTracker}>
      <ClearIcon color="error" />
    </IconButtonTracker>
  );
};
