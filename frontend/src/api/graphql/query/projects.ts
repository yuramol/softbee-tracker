import { gql } from '@apollo/client';

export const PROJECTS_QUERY = gql`
  query ProjectsByUserId(
    $filters: ProjectFiltersInput!
    $trackerFilters: TrackerFiltersInput!
  ) {
    projects(filters: $filters, pagination: { limit: -1 }) {
      data {
        id
        attributes {
          name
          type
          client
          start
          end
          status
          managers {
            data {
              id
              attributes {
                username
                firstName
                lastName
                avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          trackers(filters: $trackerFilters, sort: "date") {
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
