import { createContext, useContext } from "react";
import { AddAnimeFunction, MediaDetail } from "../interface/Interface";
import { ApolloError } from "@apollo/client";

interface AnimeDetailHooks {
  loading: boolean;
  error: ApolloError | undefined;
  data: MediaDetail | null;
  modalState: Boolean;
  setModalState: React.Dispatch<React.SetStateAction<Boolean>>;
  formState: Boolean;
  setFormState: React.Dispatch<React.SetStateAction<Boolean>>;
  collectionName: string;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
  handleCreateNewCollection: () => void;
  handleAddAnimeCollection: (newData: AddAnimeFunction) => void;
  formError: string;
  collectionModal: Boolean;
  setCollectionModal: React.Dispatch<React.SetStateAction<Boolean>>;
  handleCollectionModalState: () => void;
  handleAdditionalModalState: () => void;
  addModal: Boolean;
  setAddModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const AnimeDetailContext = createContext<AnimeDetailHooks | undefined>(
  undefined
);

export const useAnimeDetailContext = () => {
  const context = useContext(AnimeDetailContext);
  if (context === undefined) {
    throw new Error(
      "useAnimeDetailCtx must be used within a AnimeDetailProvider"
    );
  }
  return context;
};
