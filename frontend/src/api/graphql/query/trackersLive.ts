import { gql } from '@apollo/client';

export const TRACKERS_LIVE_QUERY = gql`
  query TrackersByUserId($filters: TrackerFiltersInput) {
    trackers(filters: $filters, sort: "date", pagination: { limit: -1 }) {
      data {
        id
        attributes {
          date
          duration
          description
          live
          startLiveDate
          liveDurationMinutes
          live_status
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
