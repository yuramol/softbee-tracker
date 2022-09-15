import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { RestLink } from 'apollo-link-rest';
import { useLocalStorage } from 'hooks';

const errorLink = onError(({ networkError }) => {
  const [, setJwt] = useLocalStorage('jwt');

  if (networkError && (networkError as ServerError).statusCode === 401) {
    setJwt(null);
  }
});

const authLink = setContext((_, { headers }) => {
  const [jwt] = useLocalStorage('jwt');

  if (jwt !== null) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const restLink = new RestLink({
  uri: `${process.env.REACT_APP_URI}/api`,
  typePatcher: {
    ReportPDFPayload: (data: any): any => {
      console.log('data===', data);
      return data;
    },
    // ... other nested type patchers
  },
});

const link = ApolloLink.from([errorLink, restLink, authLink.concat(httpLink)]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      UsersPermissionsRole: {
        merge: true,
      },
      UsersPermissionsUser: {
        merge: true,
      },
      Tracker: {
        merge: true,
      },
      Project: {
        merge: true,
      },
    },
  }),
});
