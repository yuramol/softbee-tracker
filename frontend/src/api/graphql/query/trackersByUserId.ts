import { gql } from '@apollo/client';

export const TRECKERS_BY_USER_ID_QUERY = gql`
  query TrackersByUserId($userId: ID!, $period: [Date]) {
    trackers(
      filters: { user: { id: { eq: $userId } }, date: { between: $period } }
      sort: "date"
    ) {
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
