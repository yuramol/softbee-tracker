import { useMutation } from '@apollo/client';

import { TRACKERS_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import { useNotification } from 'hooks';

export const useUpdateTracker = () => {
  const notification = useNotification();
  const [update] = useMutation(UPDATE_TRACKER_BY_ID_MUTATION);

  const updateTracker = (id: string, data: object) =>
    update({
      variables: { id, data },
      refetchQueries: [TRACKERS_QUERY],
    })
      .then(() => {
        notification({
          message: 'The tracker was successfully updated',
          variant: 'info',
        });
      })
      .catch(() => {
        notification({
          message: 'A problem occurred when updating a tracker',
          variant: 'error',
        });
      });
  return { updateTracker };
};
