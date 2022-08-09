import { useQuery } from '@apollo/client';

import {
  PROJECTS_TRECKERS_BY_USER_ID_QUERY,
  TRECKERS_BY_USER_ID_QUERY,
} from 'api';
import {
  Scalars,
  ProjectEntityResponseCollection,
  TrackerEntityResponseCollection,
} from 'types/GraphqlTypes';

export const useNormalizedTrackers = (
  userId: Scalars['ID'],
  period: Array<Scalars['Date']>
) => {
  const { data } = useQuery<{
    projects: ProjectEntityResponseCollection;
  }>(TRECKERS_BY_USER_ID_QUERY, {
    variables: { userId, period },
  });

  console.log(data);
};
