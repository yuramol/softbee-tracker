import { gql } from '@apollo/client';

export const TRACKERS_BY_USER_ID_QUERY = gql`
  query TrackersByUserId($userId: ID!, $startDate: Date, $endDate: Date) {
    trackers(
      filters: {
        user: { id: { eq: $userId } }
        date: { between: [$startDate, $endDate] }
      }
      sort: "date"
      pagination: { limit: -1 }
    ) {
      data {
        id
        attributes {
          date
          duration
          description
          user {
            data {
              id
              attributes {
                username
                firstName
                lastName
                position
              }
            }
          }
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
