import { gql } from '@apollo/client';

export const PROJECTS_TRECKERS_BY_USER_ID_QUERY = gql`
  query ProjectsTrackersByUserId($userId: ID!, $filterByDate: [Date]) {
    projects(filters: { users: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          name
          trackers(
            filters: {
              user: { id: { eq: $userId } }
              date: { between: $filterByDate }
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
