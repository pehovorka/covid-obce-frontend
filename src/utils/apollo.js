import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  uri: "http://192.168.1.4:4001/graphql",
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
