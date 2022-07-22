import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(({ networkError }) => {
  if (networkError && (networkError as ServerError).statusCode === 401) {
    window.localStorage.setItem('jwt', JSON.stringify(null));
  }
});

const authLink = setContext((_, { headers }) => {
  const jwt = JSON.parse(`${window.localStorage.getItem('jwt')}`);

  if (jwt && jwt !== 'null') {
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

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
