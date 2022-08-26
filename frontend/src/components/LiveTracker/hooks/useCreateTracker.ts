import { useMutation } from '@apollo/client';

import { CREATE_TRACKER_BY_USER_ID_MUTATION, TRACKERS_LIVE_QUERY } from 'api';
import {
  MutationCreateTrackerArgs,
  TrackerEntityResponse,
  TrackerInput,
} from 'types/GraphqlTypes';

const useCreateTracker = () => {
  const [create] = useMutation<
    TrackerEntityResponse,
    MutationCreateTrackerArgs
  >(CREATE_TRACKER_BY_USER_ID_MUTATION);

  const createTracker = (variables: TrackerInput) =>
    create({
      variables: { data: variables },
      refetchQueries: [TRACKERS_LIVE_QUERY],
    });
  return { createTracker };
};

export { useCreateTracker };
