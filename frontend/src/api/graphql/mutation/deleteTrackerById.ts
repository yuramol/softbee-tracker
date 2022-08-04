import { gql } from '@apollo/client';

export const DELETE_TRACKER_BY_ID_MUTATION = gql`
  mutation deleteTrackerById($id: ID!) {
    deleteTracker(id: $id) {
      data {
        id
      }
    }
  }
`;
