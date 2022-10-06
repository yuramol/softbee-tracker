import { useMutation } from '@apollo/client';

import { CREATE_TRACKER_BY_USER_ID_MUTATION, TRACKERS_QUERY } from 'api';
import {
  MutationCreateTrackerArgs,
  TrackerEntityResponse,
  TrackerInput,
} from 'types/GraphqlTypes';

export const useCreateTracker = () => {
  const [create] = useMutation<
    TrackerEntityResponse,
    MutationCreateTrackerArgs
  >(CREATE_TRACKER_BY_USER_ID_MUTATION);

  const createTracker = (data: TrackerInput) =>
    create({
      variables: {
        data,
      },
      refetchQueries: [TRACKERS_QUERY],
    });
  return { createTracker };
};
