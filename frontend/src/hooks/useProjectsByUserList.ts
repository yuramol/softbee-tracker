import { useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PROJECTS_BY_USER_ID_QUERY } from 'api';
import { ProjectEntityResponseCollection } from 'types/GraphqlTypes';
import { ItemType } from 'legos/Select/types';

type useProjectsByUserListProps = {
  userId: string;
};

export const useProjectsByUserList = () => {
  const [getProjects, { data, error }] = useLazyQuery<
    {
      projects: ProjectEntityResponseCollection;
    },
    useProjectsByUserListProps
  >(PROJECTS_BY_USER_ID_QUERY);

  const projectsItems: ItemType[] = useMemo(() => {
    if (data) {
      return data?.projects.data.map((project) => ({
        label: project.attributes?.name,
        value: project.id,
      }));
    }
    return [];
  }, [data]);

  return {
    getProjects,
    projectsItems,
    projectsError: error,
  };
};
