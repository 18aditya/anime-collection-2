import type {Media } from "src/utils/interface/Interface";

// export interface animeCollectionProps {
//   id: number | undefined;
//   title: string | undefined;
//   assets: {
//     coverImage: Image | undefined;
//     bannerImage: string | undefined;
//   };
//   popularity: number;
//   status: string;
//   episodes: number;
//   duration: number;
//   description: string;
// }

export interface addAnimeFunction extends Media {
  collId: number | undefined;
}
