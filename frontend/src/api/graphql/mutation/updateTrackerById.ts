import { gql } from '@apollo/client';

export const UPDATE_TRACKER_BY_ID_MUTATION = gql`
  mutation updateTrackerById($id: ID!, $data: TrackerInput!) {
    updateTracker(id: $id, data: $data) {
      data {
        id
        attributes {
          duration
          live
          startLiveDate
          liveDurationMinutes
          live_status
        }
      }
    }
  }
`;
