import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  </StrictMode>,
)
