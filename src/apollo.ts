import { ApolloClient, InMemoryCache } from "@apollo/client";

const privateClient = new ApolloClient({
  uri: "https://stark-fjord-06190-f7db91596700.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const publicClient = new ApolloClient({
  uri: "https://stark-fjord-06190-f7db91596700.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export { privateClient, publicClient };
