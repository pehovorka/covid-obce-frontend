import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  //uri: "http://localhost:4500/graphql",
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    },
  },
});
