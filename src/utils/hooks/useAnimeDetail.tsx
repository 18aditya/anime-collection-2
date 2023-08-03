import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAnimeDetailByID } from "../api/query/query";
import { MediaDetail } from "../interface/interface";

const useAnimeDetail = (id: number) => {
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(getAnimeDetailByID, {
    variables: { id: id },
  });
  const [modalState, setModalState] = useState<Boolean>(false);
  const handleData = async (data: any) => {
    const media = data.Media;
    const mediaData: MediaDetail = {
      id: media.id,
      title: media.title.english,
      genres: media.genres,
      type: media.type,
      popularity: media.popularity,
      status: media.status === "RELEASING" ? "On-going" : media.status,
      episodes: media.episodes || "?",
      duration: media.duration,
      format: media.format,
      description: media.description,
      averageScore: media.averageScore,
      assets: {
        coverImage: media.coverImage,
        bannerImage: media.bannerImage,
      },
      nextAiringEpisode: media.nextAiringEpisode,
    };

    return mediaData;
  };

  const [processedData, setProcessedData] = useState<MediaDetail | null>(null);

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
  return { loading, error, data: processedData,modalState, setModalState };
};

export default useAnimeDetail;
