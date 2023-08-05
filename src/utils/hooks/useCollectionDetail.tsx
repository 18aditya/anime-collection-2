import { useState, useEffect } from "react";

import { useGlobalStorageCtx } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { GlobalStorageDataProps } from "../context/GlobalStorage";

const useCollectionDetail = (id: number) => {
  const {

    GlobalStorageData,
    modalState,
    setModalState,
    setGlobalStorageData,
    loading,
  } = useGlobalStorageCtx();

  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState<number>(id);
  const [data, setData] = useState<GlobalStorageDataProps>();

  const [removeModal, setRemoveModal] = useState<Boolean>(false);
  const [editModal, setEditModal] = useState<Boolean>(false);

  const [newTitle, setNewTitle] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const handleModifyCollectionTitle = () => {
    if (newTitle.trim() === "") {
      setFormError("Collection cannot be empty");
      return;
    }

    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharPattern.test(newTitle)) {
      setFormError("Collection Name cannot contain special character");
      return;
    }
    const temp = GlobalStorageData.some(
      (dt) => dt.collection_title === newTitle
    );
    if (temp) {
      setFormError("Collection Name must be unique");
      return;
    }
    const updatedCollectionStorageData = GlobalStorageData.filter(
      (collection) => collection.id === data?.id
    );
    const res = {
      ...updatedCollectionStorageData[0],
      collection_title: newTitle,
    };

    const updatedGlobalStorageData = GlobalStorageData.map((coll) =>
      coll.id === res.id ? res : coll
    );
    setData(res);
    localStorage.setItem(
      "collections",
      JSON.stringify(updatedGlobalStorageData)
    );
    setGlobalStorageData(updatedGlobalStorageData);
    setEditModal(!editModal);
    setModalState(!modalState);
    setNewTitle("");
  };

  useEffect(() => {
    const temp = GlobalStorageData.find(
      (dt) => dt.id === collectionName
    );
    setData(temp);
  }, [collectionName, GlobalStorageData]);

  const handleCollectionList = (id: number) => {
    setModalState(!modalState);
    navigate(`/collection/${id}`);
  };

  const handleRemoveModalState = () => {
    setRemoveModal(!removeModal);
    setModalState(!modalState);
  };

  const handleEditModalState = () => {
    setEditModal(!editModal);
    setModalState(!modalState);
  };

  const handleRemoveAnimeCollection = (id: any) => {
    const temp = data;

    if (temp) {
      const removeAnimes = temp.animes.filter((anime) => anime.id !== id);

      const res = { ...temp, animes: removeAnimes };

      const updatedGlobalStorageData = GlobalStorageData.map((coll) =>
        coll.id === res.id ? res : coll
      );

      localStorage.setItem(
        "collections",
        JSON.stringify(updatedGlobalStorageData)
      );
      setGlobalStorageData(updatedGlobalStorageData);
    }
  };

  return {
    GlobalStorageData,
    modalState,
    setModalState,
    collectionName,
    setCollectionName,
    formError,
    handleCollectionList,
    loading,
    data,
    editModal,
    handleRemoveAnimeCollection,
    handleEditModalState,
    handleRemoveModalState,
    handleModifyCollectionTitle,
    newTitle,
    setNewTitle,
  };
};

export default useCollectionDetail;
