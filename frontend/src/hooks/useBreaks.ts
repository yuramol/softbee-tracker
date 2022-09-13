import { useQuery } from '@apollo/client';

import { PROJECTS_QUERY } from 'api';
import { breaksSlugs } from 'constant';
import {
  ProjectEntityResponseCollection,
  ProjectFiltersInput,
} from 'types/GraphqlTypes';

export const useBreaks = (filters: ProjectFiltersInput = {}) => {
  const { data, loading, refetch } = useQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_QUERY, {
    variables: {
      filters: {
        name: { in: breaksSlugs.map((s) => s[0].toUpperCase() + s.slice(1)) },
        ...filters,
      },
    },
  });

  const breaks = data?.projects.data;
  const breaksChoices = breaks?.map(({ id, attributes }) => ({
    value: id,
    label: attributes?.name,
  }));

  return {
    breaks,
    breaksChoices,
    loading,
    refetch,
  };
};
