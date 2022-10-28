import { gql } from '@apollo/client';

export const UPDATE_TRACKER_BY_ID_MUTATION = gql`
  mutation updateTrackerById($id: ID!, $data: TrackerInput!) {
    updateTracker(id: $id, data: $data) {
      data {
        id
        attributes {
          date
          durationMinutes
          live
          startLiveDate
          liveDurationMinutes
          live_status
          description
          project {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
