import { gql } from '@apollo/client';

export const MANUAL_TIMER_SELECT = gql`
  mutation CreateTracker(
    $desc: Text!
    $date: Date!
    $project: ID!
    $duration: Time!
  ) {
    createTracker(
      data: {
        description: $desc
        date: $date
        project: $project
        duration: $duration
      }
    ) {
      data {
        id
        attributes {
          description
          date
          project {
            data {
              id
              attributes {
                name
                note
              }
            }
          }
          duration
        }
      }
    }
  }
`;
