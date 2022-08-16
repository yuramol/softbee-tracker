import { gql } from '@apollo/client';

export const PROJECTS_LIST_QUERY = gql`
  query ProjectsList {
    projects(sort: "id") {
      data {
        id
        attributes {
          name
          type
          client
          start
          end
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
        }
      }
    }
  }
`;
