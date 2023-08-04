import { createContext, useContext } from "react";
import useGlobalStorage from "../hooks/useGlobalStorage";
import type { AnimeCollectionProps } from "src/utils/interface/Interface";

export interface GlobalStorageDataProps {
  id: number;
  collection_title: string;
  animes: Array<AnimeCollectionProps>;
  created_at: Date;
}

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
