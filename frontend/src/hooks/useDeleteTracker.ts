import { useMutation } from '@apollo/client';

import {
  TRACKERS_QUERY,
  DELETE_TRACKER_BY_ID_MUTATION,
  PROJECTS_QUERY,
} from 'api';
import {
  MutationDeleteTrackerArgs,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';

export const useDeleteTracker = () => {
  const [deleteMutation] = useMutation<
    TrackerEntityResponse,
    MutationDeleteTrackerArgs
  >(DELETE_TRACKER_BY_ID_MUTATION);

  const deleteTracker = (trackerId: string) => {
    return deleteMutation({
      variables: {
        id: trackerId,
      },
      refetchQueries: [TRACKERS_QUERY, PROJECTS_QUERY],
    });
  };
  return { deleteTracker };
};
