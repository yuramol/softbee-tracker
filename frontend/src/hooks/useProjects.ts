import { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PROJECTS_QUERY } from 'api';
import { breaksSlugs } from 'constant';
import {
  Maybe,
  ProjectEntity,
  ProjectEntityResponseCollection,
  ProjectFiltersInput,
  Scalars,
  TrackerEntity,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';
import { getTotalTime } from 'helpers';

type TotalByProject = {
  name?: string;
  total: string;
};

type ProjectsChoice = {
  value?: Maybe<Scalars['ID']>;
  label?: Scalars['String'];
};

export const useProjects = (
  projectFilters: ProjectFiltersInput = {},
  trackerFilters: TrackerFiltersInput = {}
) => {
  const projectsData = useRef<ProjectEntity[] | undefined>([]);
  const [projects, setProjects] = useState<ProjectEntity[] | undefined>([]);

  const [load, { data }] = useLazyQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_QUERY, {
    variables: {
      projectFilters: {
        name: {
          notIn: breaksSlugs.map((s) => s[0].toUpperCase() + s.slice(1)),
        },
        ...projectFilters,
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

  const totalByProjects: TotalByProject[] = [];
  const projectsChoices: ProjectsChoice[] = [];
  const allTrackers: TrackerEntity[] = [];

  projects?.forEach(({ id, attributes }) => {
    totalByProjects.push({
      name: attributes?.name,
      total: getTotalTime(attributes?.trackers?.data),
    });

    projectsChoices.push({
      value: id,
      label: attributes?.name,
    });

    allTrackers.push(...(attributes?.trackers?.data ?? []));
  });

  const total = getTotalTime(allTrackers);

  return {
    projects,
    projectsChoices,
    totalByProjects,
    total,
  };
};
