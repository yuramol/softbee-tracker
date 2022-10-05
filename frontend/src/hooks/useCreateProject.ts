import { useMutation } from '@apollo/client';

import { CREATE_PROJECT_MUTATION, PROJECTS_QUERY } from 'api';
import { useNotification } from 'hooks';
import { ProjectInput } from 'types/GraphqlTypes';

export const useCreateProject = () => {
  const [create] = useMutation(CREATE_PROJECT_MUTATION);

  const notification = useNotification();

  const createProject = (data: ProjectInput) =>
    create({ variables: { data }, refetchQueries: [PROJECTS_QUERY] })
      .then(() => {
        notification({
          message: `A new project ${data?.name}, was successfully created`,
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
