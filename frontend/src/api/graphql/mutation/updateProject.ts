import { gql } from '@apollo/client';

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($id: ID!, $data: ProjectInput!) {
    updateProject(id: $id, data: $data) {
      data {
        id
        attributes {
          name
          start
          end
          managers {
            data {
              id
            }
          }
          salary {
            id
            rate
          }
          status
          createdAt
        }
      }
    }
  }
`;
