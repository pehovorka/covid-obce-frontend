import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  //uri: "http://localhost:4500/graphql",
  uri: "https://covid-obce.srv.petrhovorka.eu/graphql",
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
