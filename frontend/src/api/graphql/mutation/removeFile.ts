import { gql } from '@apollo/client';

export const REMOVE_FILE_MUTATION = gql`
  mutation RemoveFile($id: ID!) {
    removeFile(id: $id) {
      data {
        id
        attributes {
          name
          url
          provider
          hash
          size
          mime
        }
      }
    }
  }
`;
