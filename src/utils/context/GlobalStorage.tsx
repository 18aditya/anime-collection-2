import { createContext, useContext } from "react";
import useGlobalStorage from "../hooks/useGlobalStorage";

export interface GlobalStorageData {
  [key: string]: any;
}

export interface GlobalStorageContextType {
  GlobalStorageData: GlobalStorageData;
  updateGlobalStorage: (newData: GlobalStorageData) => void;
  modalState: Boolean;
  handleShowModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<Boolean>>;
  optionState: Boolean;
  handleShowOption: () => void;
  setOption: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface GlobalStorageProviderProps {
  children: React.ReactNode;
}
const GlobalStorageCtx = createContext<GlobalStorageContextType | undefined>(
  undefined
);

export const useGlobalStorageCtx = (): GlobalStorageContextType => {
  const context = useContext(GlobalStorageCtx);
  if (context === undefined) {
    throw new Error(
      "useGlobalStorage must be used within a GlobalStorageProvider"
    );
  }
  return context;
};

export const GlobalStorageProvider: React.FC<GlobalStorageProviderProps> = ({
  children,
}) => {
  const useGlobalStorageCtx = useGlobalStorage();
  return (
    <GlobalStorageCtx.Provider value={useGlobalStorageCtx}>
      {children}
    </GlobalStorageCtx.Provider>
  );
};
