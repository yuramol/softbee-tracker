import { gql } from '@apollo/client';

export const CREATE_TRACKER_BY_USER_ID_MUTATION = gql`
  mutation CreateTrackerByUserId($data: TrackerInput!) {
    createTracker(data: $data) {
      data {
        id
        attributes {
          date
          durationMinutes
          description
          live
          startLiveDate
          liveDurationMinutes
          live_status
        }
      }
    }
  }
`;
