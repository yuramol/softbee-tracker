import { gql } from '@apollo/client';

export const UPDATE_TRACKER_BY_ID_MUTATION = gql`
  mutation UpdateTrackerById($id: ID!, $data: TrackerInput!) {
    updateTracker(id: $id, data: $data) {
      data {
        id
        attributes {
          date
          duration
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
