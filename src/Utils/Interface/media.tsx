export interface media {
  id: number | undefined;
  title: string | undefined;
  format: string | undefined;
  assets: {
    bannerImage: string | undefined;
    coverImage: image | undefined;
  };
  popularity: number | undefined;
  status: string | undefined;
  episodes: number | undefined;
  duration: number | undefined;
  description: string | undefined;
}
export interface image {
  extraLarge: string;
  large: string;
  medium: string;
}

export interface mediaDetail {
  id: number;
  title: string;
  genres: string[];
  type: string;
  popularity: number;
  status: string;
  episodes: number;
  duration: number;
  format: string;
  description: string;
  averageScore: number;
  assets: {
    coverImage: image;
    bannerImage: string;
  };
  nextAiringEpisode: {
    id: number;
    timeUntilAiring: number;
    episode: number;
  };
}
