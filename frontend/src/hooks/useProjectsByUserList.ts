import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PROJECTS_BY_USER_ID_QUERY } from 'api';
import { ProjectEntityResponseCollection } from 'types/GraphqlTypes';
import { ItemType } from 'legos/Select/types';

type useProjectsByUserListProps = {
  userId: string;
};

export const useProjectsByUserList = () => {
  const [runProjects] = useLazyQuery<
    {
      projects: ProjectEntityResponseCollection;
    },
    useProjectsByUserListProps
  >(PROJECTS_BY_USER_ID_QUERY);
  const [projectItems, setProjectItems] = useState<ItemType[]>();

  const executeProjects = useCallback(
    ({ userId }: useProjectsByUserListProps) => {
      runProjects({ variables: { userId } }).then(({ data }) => {
        if (data) {
          setProjectItems(
            data.projects.data.map((project) => ({
              label: project.attributes?.name,
              value: project.id,
            }))
          );
        }
      });
    },
    [runProjects]
  );
  return {
    executeProjects,
    projectItems,
  };
};
