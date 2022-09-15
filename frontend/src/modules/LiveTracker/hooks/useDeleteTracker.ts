import { useMutation } from '@apollo/client';

import { TRACKERS_QUERY, DELETE_TRACKER_BY_ID_MUTATION } from 'api';
import {
  MutationDeleteTrackerArgs,
  TrackerEntity,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';

const useDeleteTracker = () => {
  const [deleteMutation] = useMutation<
    TrackerEntityResponse,
    MutationDeleteTrackerArgs
  >(DELETE_TRACKER_BY_ID_MUTATION);

  const deleteTracker = (tracker: TrackerEntity) => {
    return deleteMutation({
      variables: {
        id: tracker.id as string,
      },
      refetchQueries: [TRACKERS_QUERY],
    });
  };
  return { deleteTracker };
};

export { useDeleteTracker };
