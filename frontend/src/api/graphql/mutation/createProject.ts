import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($data: ProjectInput!) {
    createProject(data: $data) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
