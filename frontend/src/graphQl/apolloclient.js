import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create an HttpLink to your GraphQL server
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Your GraphQL endpoint
});

// Create a setContext link to include the auth token in headers
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo.token);
  // Return the headers including the auth token if it exists
  return {
    headers: {
      ...headers,
      authorization: userInfo.token ? `Bearer ${userInfo.token}` : "",
    },
  };
});

// Combine the authLink and httpLink using ApolloLink.concat
const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export default client;
