import { useQuery } from '@apollo/client';
import { PROJECT_QUERY } from 'api/graphql/query/project';
import { ProjectEntityResponse, Scalars } from 'types/GraphqlTypes';

export const useProject = (id: Scalars['ID']) => {
  const { data, refetch, loading } = useQuery<{
    project: ProjectEntityResponse;
  }>(PROJECT_QUERY, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const projectData = data?.project.data?.attributes;
  return {
    projectData,
    refetch,
    loading,
  };
};
