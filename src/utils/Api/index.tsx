import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { client as Client };
export { getTrendingAnime as GetTrendingAnime } from "./Query/query";
export { getAnimeDetailByID as GetAnimeDetailByID } from "./Query/query";
