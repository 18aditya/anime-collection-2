import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetTrendingAnime } from "src/Utils/Apis/api";
import type { Media, PageProperties } from "src/Utils/Interface/interface";

interface DataModel {
  Data: Media[];
  Page: PageProperties;
}

const useAnimeData = () => {
  const [pageDropdown, setPageDropdown] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(GetTrendingAnime, {
    variables: { page: page, perPage: perPage },
  });

  const handleData = async (data: any) => {
    const pageData = data.Page.pageInfo;
    const mediaData = data.Page.media.map((media: any) => ({
      id: media.id,
      title: media.title.english || "-Title Not found-",
      format: media.format,
      assets: {
        bannerImage: media.bannerImage || media.coverImage.extraLarge,
        coverImage: media.coverImage,
      },
      popularity: media.popularity,
      status: media.status === "RELEASING" ? "On-going" : media.status,
      episodes: media.episodes,
      duration: media.duration,
      description: media.description,
    }));

    return {
      Data: mediaData,
      Page: {
        currentPage: pageData.currentPage,
        hasNextPage: pageData.hasNextPage,
        lastPage: pageData.lastPage,
        perPage: pageData.perPage,
        total: pageData.total,
      },
    };
  };

  const [processedData, setProcessedData] = useState<DataModel | null>(null);

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

  const handleChangeDataperPage = (data: number) => {
    setPerPage(data);
    setPageDropdown(false);
  };

  const handlePageNext = () => {
    if (queryData.Page.pageInfo.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleLastPage = () => {
    setPage(queryData.Page.pageInfo.lastPage);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  return {
    data: processedData,
    loading,
    error,
    pageDropdown,
    page,
    perPage,
    setPageDropdown,
    handlePageBack,
    handlePageNext,
    handleFirstPage,
    handleLastPage,
    handleChangeDataperPage,
  };
};

export default useAnimeData;
