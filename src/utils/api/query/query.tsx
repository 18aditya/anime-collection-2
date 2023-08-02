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
        bannerImage
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
        description(asHtml: true)
      }
    }
  }
`;

export const getAnimeDetailByID: DocumentNode = gql`
  query GetAnimeDetail($id: Int!) {
    Media(id: $id) {
      id
      title {
        english
      }
      genres
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
      bannerImage
      averageScore
      
    }
  }
`;
