export interface media {
  id: number;
  title: string;
  format: string;
  assets: {
    bannerImage: string;
    coverImage: image;
  };
  popularity: number;
  status: string;
  episodes: number;
  duration: number;
  description: string;
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
  episodes: number | string;
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
