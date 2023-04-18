import { useMutation } from '@apollo/client';

import {
  PROJECTS_QUERY,
  TRACKERS_QUERY,
  UPDATE_TRACKER_BY_ID_MUTATION,
} from 'api';

export const useUpdateTracker = () => {
  const [update] = useMutation(UPDATE_TRACKER_BY_ID_MUTATION);

  const updateTracker = (id: string, data: object) =>
    update({
      variables: { id, data },
      refetchQueries: [TRACKERS_QUERY, PROJECTS_QUERY],
    });
  return { updateTracker };
};
