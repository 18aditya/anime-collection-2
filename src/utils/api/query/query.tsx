import { gql, DocumentNode } from "@apollo/client";

export const getTrendingAnime: DocumentNode = gql`
  query GetTrendingAnime($page: Int = 1, $perPage: Int = 10) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          english
        }
        format
        type
        popularity
        status
        episodes
        duration
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`;
