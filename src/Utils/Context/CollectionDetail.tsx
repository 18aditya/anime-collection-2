import { createContext, useContext } from "react";
import { GlobalStorageDataProps } from "src/Utils/Interface";

interface CollectionDetailHooks {
  modalState: Boolean;
  setModalState: React.Dispatch<React.SetStateAction<Boolean>>;
  collectionName: number;
  setCollectionName: React.Dispatch<React.SetStateAction<number>>;
  GlobalStorageData: Array<GlobalStorageDataProps>;
  formError: string;
  loading: Boolean;
  data: GlobalStorageDataProps | undefined;
  handleRemoveAnimeCollection: (id: any | undefined) => void;
  handleEditModalState: () => void;
  handleRemoveModalState: (id: any) => void;
  handleModifyCollectionTitle: () => void;
  editModal: Boolean;
  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  removeModal: Boolean;
  removedAnime: any;
}

export const CollectionDetailContext = createContext<
  CollectionDetailHooks | undefined
>(undefined);

export const useCollectionDetailContext = () => {
  const context = useContext(CollectionDetailContext);
  if (context === undefined) {
    throw new Error(
      "useCollectionDetailCtx must be used within a CollectionDetailProvider"
    );
  }
  return context;
};
