import { useMutation } from '@apollo/client';

import { PROJECTS_QUERY, UPDATE_PROJECT_MUTATION } from 'api';
import { useNotification } from 'hooks';

export const useUpdateProject = () => {
  const notification = useNotification();
  const [update] = useMutation(UPDATE_PROJECT_MUTATION);

  const updateProject = (id: string, data: object, name?: string) =>
    update({ variables: { id, data }, refetchQueries: [PROJECTS_QUERY] })
      .then(() => {
        notification({
          message: `The ${name} project, was successfully updated`,
          variant: 'success',
        });
      })
      .catch(() => {
        notification({
          message: `A problem occurred when updating a ${name} project`,
          variant: 'error',
        });
      });

  return { updateProject };
};
