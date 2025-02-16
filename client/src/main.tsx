import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)
