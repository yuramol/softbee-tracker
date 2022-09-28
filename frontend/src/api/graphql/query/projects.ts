import { gql } from '@apollo/client';

export const PROJECTS_QUERY = gql`
  query ProjectsByUserId(
    $projectFilters: ProjectFiltersInput!
    $trackerFilters: TrackerFiltersInput!
  ) {
    projects(filters: $projectFilters, pagination: { limit: -1 }, sort: "id") {
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
                durationMinutes
              }
            }
          }
        }
      }
    }
  }
`;
