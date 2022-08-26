import { gql } from '@apollo/client';

export const UPDATE_TRACKER_BY_ID_MUTATION = gql`
  mutation UpdateTrackerById($id: ID!, $time: Time!) {
    updateTracker(id: $id, data: { duration: $time }) {
      data {
        attributes {
          duration
        }
      }
    }
  }
`;
