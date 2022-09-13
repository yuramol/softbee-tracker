import { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PROJECTS_QUERY } from 'api';
import { breaksSlugs } from 'constant';
import {
  ProjectEntity,
  ProjectEntityResponseCollection,
  ProjectFiltersInput,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';

export const useProj = (
  filters: ProjectFiltersInput = {},
  trackerFilters: TrackerFiltersInput = {}
) => {
  const projectsData = useRef<ProjectEntity[] | undefined>([]);
  const [projects, setProjects] = useState<ProjectEntity[] | undefined>([]);

  const [load, { data }] = useLazyQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_QUERY, {
    variables: {
      filters: {
        name: {
          notIn: breaksSlugs.map((s) => s[0].toUpperCase() + s.slice(1)),
        },
        ...filters,
      },
      trackerFilters: { live: { eq: false }, ...trackerFilters },
    },
  });

  useEffect(() => {
    load().then(({ data }) => {
      projectsData.current = data?.projects.data;
      setProjects([...(projectsData.current as ProjectEntity[])]);
    });
  }, [data]);

  console.log(projects);

  return { projects };
};
