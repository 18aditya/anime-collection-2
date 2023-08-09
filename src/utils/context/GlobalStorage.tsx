import { createContext, useContext } from "react";
import { useGlobalStorage } from "src/Utils/Hooks/hooks";
import type { GlobalStorageDataProps } from "src/Utils/Interface/interface";

export interface GlobalStorageContextType {
  GlobalStorageData: Array<GlobalStorageDataProps>;
  updateGlobalStorage: (newData: GlobalStorageDataProps) => void;
  modalState: Boolean;
  handleShowModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<Boolean>>;
  optionState: Boolean;
  handleShowOption: () => void;
  setOption: React.Dispatch<React.SetStateAction<Boolean>>;
  setGlobalStorageData: React.Dispatch<
    React.SetStateAction<GlobalStorageDataProps[]>
  >;
  deleteGlobalStorage: (id: number) => void;
  addModal: Boolean;
  handleCreateNewCollection: () => void;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
  collectionName: string;
  formError: string;
  loading: Boolean;
  setAddModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface GlobalStorageProviderProps {
  children: React.ReactNode;
}
const GlobalStorageCtx = createContext<GlobalStorageContextType | undefined>(
  undefined
);

export const useGlobalStorageContext = (): GlobalStorageContextType => {
  const context = useContext(GlobalStorageCtx);
  if (context === undefined) {
    throw new Error(
      "useGlobalStorage must be used within a GlobalStorageProvider"
    );
  }
  return context;
};

export const GlobalStoragePrvdr: React.FC<GlobalStorageProviderProps> = ({
  children,
}) => {
  const useGlobalStorageCtx = useGlobalStorage();
  return (
    <GlobalStorageCtx.Provider value={useGlobalStorageCtx}>
      {children}
    </GlobalStorageCtx.Provider>
  );
};
