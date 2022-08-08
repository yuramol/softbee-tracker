import { gql } from '@apollo/client';

export const CREATE_UPLOAD_FILE_MUTATION = gql`
  mutation CreateUploadFile($data: UploadFileInput!) {
    createUploadFile(data: $data) {
      data {
        id
      }
    }
  }
`;
