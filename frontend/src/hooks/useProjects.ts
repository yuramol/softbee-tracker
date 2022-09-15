import { useQuery } from '@apollo/client';

import { PROJECTS_QUERY } from 'api';
import {
  ProjectEntityResponseCollection,
  ProjectFiltersInput,
} from 'types/GraphqlTypes';

export const useProjects = (filters: ProjectFiltersInput = {}) => {
  const { data, loading, refetch } = useQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_QUERY, {
    variables: { filters },
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
