import { useState, useEffect } from "react";
import { GlobalStorageData } from "../context/GlobalStorage";

const useGlobalStorage = () => {
  //layout component
  const [optionState, setOption] = useState<Boolean>(false);

  const handleShowOption = () => {
    setOption(!optionState);
  };

  //modal component
  const [modalState, setModalState] = useState<Boolean>(false);

  const handleShowModal = () => {
    setModalState(true);
  };

  //storage component
  const [GlobalStorageData, setGlobalStorageData] = useState<GlobalStorageData>(
    {}
  );

  useEffect(() => {
    const data = localStorage.getItem("appData");
    if (data) {
      setGlobalStorageData(JSON.parse(data));
    }
  }, []);

  const updateGlobalStorage = (newData: GlobalStorageData) => {
    localStorage.setItem("appData", JSON.stringify(newData));
    setGlobalStorageData(newData);
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
  };
};

export default useGlobalStorage;
