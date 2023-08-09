import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAnimeDetailByID } from "src/Utils/Api/query/query";
import type {
  MediaDetail,
  AddAnimeFunction,
} from "src/Utils/Interface/interface";
import { useGlobalStorageCtx } from "src/Utils/Context/context";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState<string>("");
  const [formState, setFormState] = useState<Boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [collectionModal, setCollectionModal] = useState<Boolean>(false);
  const [addModal, setAddModal] = useState<Boolean>(false);

  const handleCollectionList = (id: number) => {
    setModalState(!modalState);
    navigate(`/collection/${id}`);
  };

  const handleAdditionalModalState = () => {
    setAddModal(!addModal);
    setModalState(!modalState);
  };

  const handleCollectionModalState = () => {
    setCollectionModal(!collectionModal);
    setModalState(!modalState);
  };

  const handleAddAnimeCollection = ({
    collId,
    id,
    title,
    assets,
    popularity,
    status,
    episodes,
    duration,
    description,
    format,
  }: AddAnimeFunction) => {
    const req = {
      id: id,
      title: title,
      assets: assets,
      popularity: popularity,
      status: status,
      episodes: episodes,
      duration: duration,
      description: description,
      format,
      added_at: new Date(),
    };

    const temp = GlobalStorageData.find((dt) => dt.id === collId);

    if (temp) {
      if (temp.animes.find((dt: any) => dt.id === id)) {
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
    if (collectionName.trim() === "") {
      setFormError("Collection cannot be empty");
      return;
    }
    const body = {
      id: GlobalStorageData[GlobalStorageData.length - 1]
        ? GlobalStorageData[GlobalStorageData.length - 1].id + 1
        : 1,
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
        bannerImage: media.bannerImage || media.coverImage.extraLarge,
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
    handleCollectionList,
  };
};

export default useAnimeDetail;
