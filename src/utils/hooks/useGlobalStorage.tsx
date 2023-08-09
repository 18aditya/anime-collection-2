import { useState, useEffect } from "react";
import { GlobalStorageDataProps } from "src/Utils/Interface/interface";

const useGlobalStorage = () => {
  //layout component
  const [optionState, setOption] = useState<Boolean>(false);

  const handleShowOption = () => {
    setOption(!optionState);
  };

  //modal component
  const [modalState, setModalState] = useState<Boolean>(false);
  const [addModal, setAddModal] = useState<Boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);
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
    setAddModal(false);
    setFormError("");
    setCollectionName("");
    setModalState(false);
  };

  const handleShowModal = () => {
    setAddModal(!addModal);
    setModalState(!modalState);
  };

  //storage component
  const [GlobalStorageData, setGlobalStorageData] = useState<
    Array<GlobalStorageDataProps>
  >([]);

  useEffect(() => {
    const data = localStorage.getItem("collections");
    if (data) {
      setGlobalStorageData(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  const updateGlobalStorage = (newData: GlobalStorageDataProps) => {
    const collArray = GlobalStorageData;
    var temp = [...collArray, newData];

    localStorage.setItem("collections", JSON.stringify(temp));
    setGlobalStorageData(temp);
  };

  const deleteGlobalStorage = (id: number) => {
    const collArray = GlobalStorageData;
    var temp = collArray.filter((dt) => dt.id !== id);

    if (temp) {
      localStorage.setItem("collections", JSON.stringify(temp));
      setGlobalStorageData(temp);
    }
  };
  return {
    GlobalStorageData,
    updateGlobalStorage,
    modalState,
    handleShowModal,
    setModalState,
    optionState,
    handleShowOption,
    setOption,
    setGlobalStorageData,
    deleteGlobalStorage,
    addModal,
    handleCreateNewCollection,
    setCollectionName,
    collectionName,
    formError,
    loading,
    setAddModal,
  };
};

export default useGlobalStorage;
