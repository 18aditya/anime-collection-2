import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAnimeDetailByID } from "../api/query/query";
import { MediaDetail, AddAnimeFunction } from "../interface/Interface";
import { useGlobalStorageCtx } from "../context/Context";

const useAnimeDetail = (id: number) => {
  const {
    updateGlobalStorage,
    GlobalStorageData,
    modalState,
    setModalState,
    setGlobalStorageData,
  } = useGlobalStorageCtx();

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(getAnimeDetailByID, {
    variables: { id: id },
  });

  const [collectionName, setCollectionName] = useState<string>("");
  const [formState, setFormState] = useState<Boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [collectionModal, setCollectionModal] = useState<Boolean>(false);
  const [addModal, setAddModal] = useState<Boolean>(false);

  const handleAdditionalModalState = () => {
    setAddModal(!addModal);
    setModalState(!modalState);
  };

  const handleCollectionModalState = () => {
    setCollectionModal(!collectionModal);
    setModalState(!modalState);
  };
  const handleAddAnimeCollection = ({
    id,
    title,
    coverImage,
    bannerImage,
    collId,
  }: AddAnimeFunction) => {
    const req = {
      id: id,
      title: title,
      coverImage: coverImage,
      bannerImage: bannerImage,
      added_at: new Date(),
    };

    const temp = GlobalStorageData.find((dt) => dt.id === collId);

    if (temp) {
      if (temp.animes.find((dt) => dt.id === id)) {
        return;
      }

      temp.animes.push(req);

      const updatedGlobalStorageData = GlobalStorageData.map((coll) =>
        coll.id === collId ? temp : coll
      );

      localStorage.setItem(
        "collections",
        JSON.stringify(updatedGlobalStorageData)
      );
      setGlobalStorageData(updatedGlobalStorageData);
    }
  };

  const handleCreateNewCollection = () => {
    const body = {
      id: GlobalStorageData.length + 1,
      collection_title: collectionName,
      animes: [],
      created_at: new Date(),
    };
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharPattern.test(collectionName)) {
      setFormError("Collection Name cannot contain special character");
      return;
    }
    const temp = GlobalStorageData.some(
      (dt) => dt.collection_title === collectionName
    );
    if (temp) {
      setFormError("Collection Name must be unique");
      return;
    }
    updateGlobalStorage(body);
    setFormState(false);
  };

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
  return {
    loading,
    error,
    data: processedData,
    modalState,
    setModalState,
    formState,
    setFormState,
    collectionName,
    setCollectionName,
    handleCreateNewCollection,
    handleAddAnimeCollection,
    formError,
    collectionModal,
    setCollectionModal,
    handleCollectionModalState,
    handleAdditionalModalState,
    addModal,
    setAddModal,
  };
};

export default useAnimeDetail;
