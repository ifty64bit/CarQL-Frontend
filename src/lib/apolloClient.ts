import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    link: createHttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include",
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
});

export default client;
