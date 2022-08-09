import { gql } from '@apollo/client';

export const TRECKERS_BY_USER_ID_QUERY = gql`
  query TrackersByUserId($userId: ID!, $weekStart: Date, $weekEnd: Date) {
    trackers(
      filters: {
        user: { id: { eq: $userId } }
        date: { between: [$weekStart, $weekEnd] }
      }
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
