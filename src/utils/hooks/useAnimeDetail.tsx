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
      genres:media.genres,
      type: media.type,
      popularity: media.popularity,
      status: media.status === "RELEASING" ? "On-going" : media.status,
      episodes: media.episodes || "Unknown",
      duration: media.duration,
      format: media.format,
      description: media.description,
      averageScore:media.averageScore,
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
