import { gql } from '@apollo/client';

export const CREATE_TRACKER_BY_USER_ID_MUTATION = gql`
  mutation createTrackerByUserId($data: TrackerInput!) {
    createTracker(data: $data) {
      data {
        id
        attributes {
          date
          duration
          description
        }
      }
    }
  }
`;
