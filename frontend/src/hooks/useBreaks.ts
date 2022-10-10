import { useQuery } from '@apollo/client';

import { PROJECTS_QUERY } from 'api';
import { breaksSlugs } from 'constant';
import { toUpperCaseFirst } from 'helpers';
import {
  ProjectEntityResponseCollection,
  ProjectFiltersInput,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';

export const useBreaks = (
  projectFilters: ProjectFiltersInput = {},
  trackerFilters: TrackerFiltersInput = {}
) => {
  const { data, loading, refetch } = useQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_QUERY, {
    variables: {
      projectFilters: {
        name: { in: breaksSlugs.map((s) => toUpperCaseFirst(s)) },
        ...projectFilters,
      },
      trackerFilters,
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
