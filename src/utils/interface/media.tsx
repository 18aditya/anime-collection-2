export interface media {
  id: number;
  title: string;
  type: string;
  status: string;
  format: string;
  duration: number;
  episodes: number;
  popularity: number;
  assets: {
    coverImage: Image;
    bannerImage: string;
  };
  description: string;
}

interface Image {
  extraLarge: string;
  large: string;
  medium: string;
}
