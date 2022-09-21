import { useMutation } from '@apollo/client';

import { Maybe } from 'graphql/jsutils/Maybe';
import { UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import { useNotification } from 'hooks';

export const useUpdateTracker = () => {
  const notification = useNotification();
  const [update] = useMutation(UPDATE_TRACKER_BY_ID_MUTATION);

  const updateTracker = (id: Maybe<string>, data: object) =>
    update({
      variables: { id, data },
    }).then(() => {
      notification({
        message: 'The tracker was successfully updated',
        variant: 'info',
      });
    });
  return { updateTracker };
};
