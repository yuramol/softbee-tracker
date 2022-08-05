import { gql } from '@apollo/client';

export const UPLOAD_FILE_MUTATION = gql`
  mutation CreateUploadFile($data: UploadFileInput!) {
    createUploadFile(data: $data) {
      data {
        id
      }
    }
  }
`;
