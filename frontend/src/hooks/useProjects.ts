import { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PROJECTS_QUERY } from 'api';
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
  const [allProjects, setAllProjects] = useState<ProjectEntity[] | undefined>(
    []
  );

  const [load, { data }] = useLazyQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_QUERY, {
    variables: {
      projectFilters: {
        ...projectFilters,
      },
      trackerFilters: { live: { eq: false }, ...trackerFilters },
    },
  });

  useEffect(() => {
    load().then(({ data }) => {
      projectsData.current = data?.projects.data;

      const exceptionProjects = ['Unpaid', 'Vacation', 'Sickness'];

      setAllProjects([...(projectsData.current as ProjectEntity[])]);

      setProjects([
        ...(projectsData.current?.filter(
          ({ attributes }) =>
            !exceptionProjects.includes(attributes?.name as string)
        ) as ProjectEntity[]),
      ]);
    });
  }, [data]);

  const totalByProjects: TotalByProject[] = [];
  const projectsChoices: ProjectsChoice[] = [];
  const allTrackers: TrackerEntity[] = [];

  allProjects?.forEach(({ attributes }) => {
    totalByProjects.push({
      name: attributes?.name,
      total: getTotalTime(attributes?.trackers?.data),
    });

    allTrackers.push(...(attributes?.trackers?.data ?? []));
  });

  projects?.forEach(({ id, attributes }) => {
    projectsChoices.push({
      value: id,
      label: attributes?.name,
    });
  });

  const total = getTotalTime(allTrackers);

  return {
    projects,
    projectsChoices,
    totalByProjects,
    total,
  };
};
