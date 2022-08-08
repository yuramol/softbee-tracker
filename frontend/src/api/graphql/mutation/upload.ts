import { gql } from '@apollo/client';

export const UPLOAD_MUTATION = gql`
  mutation Upload($file: Upload!) {
    upload(file: $file) {
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
