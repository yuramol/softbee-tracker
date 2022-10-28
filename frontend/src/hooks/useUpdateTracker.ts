import { useMutation } from '@apollo/client';

import { TRACKERS_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';

export const useUpdateTracker = () => {
  const [update] = useMutation(UPDATE_TRACKER_BY_ID_MUTATION);

  const updateTracker = (id: string, data: object) =>
    update({
      variables: { id, data },
      refetchQueries: [TRACKERS_QUERY],
    });
  return { updateTracker };
};
