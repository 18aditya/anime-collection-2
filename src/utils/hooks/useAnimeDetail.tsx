import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAnimeDetailByID } from "../api/query/query";
import { Media } from "../interface/interface";

const useAnimeDetail = (id: number) => {
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(getAnimeDetailByID, {
    variables: { id: id },
  });

  const handleData = async (data: any) => {
    const media = data.Media;
    const mediaData: Media = {
      id: media.id,
      title: media.title.english,
      status: media.status === "RELEASING" ? "On-going" : media.status,
      format: media.format,
      duration: media.duration,
      episodes: media.episodes || "Unknown",
      popularity: media.popularity,
      description: media.description,
      type: media.type,
      assets: {
        coverImage: media.coverImage,
        bannerImage: media.bannerImage,
      },
    };

    return mediaData;
  };

  const [processedData, setProcessedData] = useState<Media | null>(null);

  useEffect(() => {
    if (queryData) {
      handleData(queryData)
        .then((result) => {
          setProcessedData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [queryData]);
  return { loading, error, data: processedData };
};

export default useAnimeDetail;
