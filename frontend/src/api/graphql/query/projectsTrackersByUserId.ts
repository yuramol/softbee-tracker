import { gql } from '@apollo/client';

export const PROJECTS_TRECKERS_BY_USER_ID_QUERY = gql`
  query ProjectsTrackersByUserId($userId: ID!, $period: [Date]) {
    projects(filters: { users: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          name
          trackers(
            filters: {
              user: { id: { eq: $userId } }
              date: { between: $period }
            }
          ) {
            data {
              id
              attributes {
                duration
              }
            }
          }
        }
      }
    }
  }
`;
