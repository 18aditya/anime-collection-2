import { Media } from "src/Utils/Interface";

export interface globalStorageDataProps {
  id: number;
  collection_title: string;
  animes: Array<Media>;
  created_at: Date;
}
