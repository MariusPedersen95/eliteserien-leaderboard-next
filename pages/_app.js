import { ApolloProvider } from '@apollo/client';

import client from '../apollo-client';
import { GlobalStyle } from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
