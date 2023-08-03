import { createContext, useContext } from "react";
import { MediaDetail } from "../interface/interface";
import { ApolloError } from "@apollo/client";

interface AnimeDetailHooks {
  loading: boolean;
  error: ApolloError | undefined;
  data: MediaDetail | null;
  modalState: Boolean;
  setModalState: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const AnimeDetailCtx = createContext<AnimeDetailHooks | undefined>(
  undefined
);

export const useAnimeDetailCtx = () => {
  const context = useContext(AnimeDetailCtx);
  if (context === undefined) {
    throw new Error(
      "useAnimeDetailCtx must be used within a AnimeDetailProvider"
    );
  }
  return context;
};
