import { useState } from "react";

import { useGlobalStorageCtx } from "src/Utils/Context/context";

const useCollectionList = () => {
  const {
    GlobalStorageData,
    modalState,
    setModalState,
    deleteGlobalStorage,
    setGlobalStorageData,
  } = useGlobalStorageCtx();

  const [deleteModal, setDeleteModal] = useState<Boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [editModal, setEditModal] = useState<Boolean>(false);
  const [editId, setEditId] = useState<number>();
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
      (collection) => collection.id === editId
    );
    const res = {
      ...updatedCollectionStorageData[0],
      collection_title: newTitle,
    };

    const updatedGlobalStorageData = GlobalStorageData.map((coll) =>
      coll.id === res.id ? res : coll
    );

    localStorage.setItem(
      "collections",
      JSON.stringify(updatedGlobalStorageData)
    );
    setGlobalStorageData(updatedGlobalStorageData);
    setEditModal(!editModal);
    setModalState(!modalState);
    setNewTitle("");
  };

  const handleEditModalState = (id?: number) => {
    setEditId(id || editId);
    setEditModal(!editModal);
    setModalState(!modalState);
  };

  const handleDeleteCollection = () => {
    if (!deleteId) {
      return;
    }
    setDeleteModal(!deleteModal);
    setModalState(!modalState);
    deleteGlobalStorage(deleteId);
  };

  const handleDeleteModalState = (id?: number) => {
    setDeleteId(id || deleteId);
    setDeleteModal(!deleteModal);
    setModalState(!modalState);
  };
  return {
    GlobalStorageData,
    deleteGlobalStorage,
    handleEditModalState,
    handleDeleteModalState,
    editModal,
    deleteModal,
    handleDeleteCollection,
    deleteId,
    handleModifyCollectionTitle,
    newTitle,
    setNewTitle,
    setEditId,
    formError,
  };
};

export default useCollectionList;
