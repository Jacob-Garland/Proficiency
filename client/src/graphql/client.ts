import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const PROD_URI = "https://proficiency-api.onrender.com/graphql";
const DEV_URI = "http://localhost:4000/graphql";

// API endpoint for GraphQL server
const httpLink = createHttpLink({
  uri: window.location.hostname === "localhost" ? DEV_URI : PROD_URI, 
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
