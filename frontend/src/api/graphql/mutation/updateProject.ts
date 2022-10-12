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
          manager {
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
