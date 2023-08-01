export interface media {
  id: number;
  title: string;
  type: string;
  status: string;
  format: string;
  duration: number;
  episode: number;
  popularity: number;
  coverImage: Image;
}

interface Image {
  extraLarge: string;
  large: string;
  medium: string;
}
