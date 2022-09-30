import { useMutation } from '@apollo/client';

import { CREATE_PROJECT_MUTATION, TRACKERS_QUERY } from 'api';
import { useNotification } from 'hooks';

export const useCreateProject = () => {
  const [create] = useMutation(CREATE_PROJECT_MUTATION);

  const notification = useNotification();

  const createProject = (data: object, name?: string) =>
    create({ variables: { data }, refetchQueries: [TRACKERS_QUERY] })
      .then(() => {
        notification({
          message: `A new project named: ${name}, was successfully created`,
          variant: 'success',
        });
      })
      .catch(() => {
        notification({
          message: 'A problem occurred when creating a new project',
          variant: 'error',
        });
      });

  return { createProject };
};
