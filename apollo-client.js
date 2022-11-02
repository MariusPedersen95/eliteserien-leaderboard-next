import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  //
  uri: 'https://resultatservice-api.stage-sumo.tv2.no/api/graphql',
  // uri: '',
  cache: new InMemoryCache(),
});

export default client;
