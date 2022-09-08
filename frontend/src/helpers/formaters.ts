import { GraphQLError } from 'graphql';

export const formatGraphqlError = (error: any) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.log('Graphql error:', error);
  }

  if (error && typeof error === 'string') {
    return error;
  }

  if (error && Array.isArray(error)) {
    return `${error.join('\n ')}`;
  }

  return `${
    error && error.graphQLErrors && error.graphQLErrors.length
      ? error.graphQLErrors.map((e: GraphQLError) => e.message).join('\n ')
      : error.message
  }`;
};

export const formatUserFullName: (
  firstName?: string,
  lastName?: string
) => string = (firstName, lastName) => {
  return firstName ? `${firstName} ${lastName} ` : '';
};
