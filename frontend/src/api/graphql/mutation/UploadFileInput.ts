import { gql } from '@apollo/client';

export const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFileInput($id: ID!, $data: UploadFileInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;
