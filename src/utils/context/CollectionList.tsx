import React, { createContext, useContext } from "react";
import { GlobalStorageDataProps } from "src/Utils/Interface/interface";

export interface CollectionListHooks {
  GlobalStorageData: Array<GlobalStorageDataProps>;
  deleteGlobalStorage: (id: number) => void;
  handleEditModalState: (id?: number) => void;
  handleDeleteModalState: (id?: number) => void;
  editModal: Boolean;
  deleteModal: Boolean;
  handleDeleteCollection: () => void;
  deleteId: number | undefined;
  handleModifyCollectionTitle: () => void;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditId: React.Dispatch<React.SetStateAction<number | undefined>>;
  newTitle: string;
  formError: string;
}

export const CollectionListContext = createContext<
  CollectionListHooks | undefined
>(undefined);

export const useCollectionListContext = () => {
  const context = useContext(CollectionListContext);
  if (context === undefined) {
    throw new Error(
      "useCollectionListCtx must be used within a CollectionListProvider"
    );
  }
  return context;
};
