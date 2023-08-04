import type { Image } from "./Interface";

export interface animeCollectionProps {
  id: number | undefined;
  title: string | undefined;
  coverImage: Image | undefined;
  bannerImage: string | undefined;
}

export interface addAnimeFunction extends animeCollectionProps {
  collId: number | undefined;
}
