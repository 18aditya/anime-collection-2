import { useState, useEffect } from "react";
import { GlobalStorageDataProps } from "../context/GlobalStorage";

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
  const [GlobalStorageData, setGlobalStorageData] = useState<
    Array<GlobalStorageDataProps>
  >([]);

  useEffect(() => {
    const data = localStorage.getItem("collections");
    if (data) {
      setGlobalStorageData(JSON.parse(data));
    }
  }, []);

  const updateGlobalStorage = (newData: GlobalStorageDataProps) => {
    const collArray = GlobalStorageData;
    var temp = [...collArray, newData];
    

    localStorage.setItem("collections", JSON.stringify(temp));
    setGlobalStorageData(temp);
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
  };
};

export default useGlobalStorage;
