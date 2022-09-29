import { gql } from '@apollo/client';

export const PROJECT_QUERY = gql`
  query Project($id: ID!) {
    project(id: $id) {
      data {
        attributes {
          name
          client
          start
          end
          type
          status
          salary {
            id
            rate
            users {
              data {
                attributes {
                  firstName
                  lastName
                }
              }
            }
          }
          managers {
            data {
              id
              attributes {
                firstName
                lastName
                avatar {
                  data {
                    attributes {
                      url
                      name
                    }
                  }
                }
              }
            }
          }
          trackers {
            data {
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
