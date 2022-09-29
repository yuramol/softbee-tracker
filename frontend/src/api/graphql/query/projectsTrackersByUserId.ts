import { gql } from '@apollo/client';

export const PROJECTS_TRACKERS_BY_USER_ID_QUERY = gql`
  query ProjectsTrackersByUserId(
    $userId: ID!
    $startDate: Date
    $endDate: Date
  ) {
    projects(filters: { users: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          name
          trackers(
            filters: {
              user: { id: { eq: $userId } }
              date: { between: [$startDate, $endDate] }
              live: { eq: false }
            }
            sort: "date"
          ) {
            data {
              id
              attributes {
                durationMinutes
              }
            }
          }
        }
      }
    }
  }
`;
