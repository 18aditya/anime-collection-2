export interface media {
  id: number;
  title: string;
  format: string;
  assets: {
    bannerImage: string;
    coverImage: Image;
  };
  popularity: number;
  status: string;
  episodes: number;
  duration: number;
  description: string;
}
interface Image {
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
    coverImage: {
      extraLarge: string;
      large: string;
      medium: string;
      color: string;
    };
    bannerImage: string;
  };
  nextAiringEpisode: {
    id: number;
    timeUntilAiring: number;
    episode: number;
  };
}