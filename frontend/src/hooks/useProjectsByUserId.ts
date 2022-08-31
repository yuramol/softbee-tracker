import { useQuery } from '@apollo/client';

import { PROJECTS_BY_USER_ID_QUERY } from 'api';
import { ProjectEntityResponseCollection, Scalars } from 'types/GraphqlTypes';

export const useProjectsByUserId = (userId: Scalars['ID']) => {
  const { data, loading, refetch } = useQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_BY_USER_ID_QUERY, {
    variables: { userId },
  });

  const projects = data?.projects.data;
  const projectsChoices = projects?.map(({ id, attributes }) => ({
    value: id,
    label: attributes?.name,
  }));

  return {
    projects,
    projectsChoices,
    loading,
    refetch,
  };
};
