import { createContext, useContext } from "react";
import { Media } from "../interface/interface";
import { ApolloError } from "@apollo/client";

interface AnimeDetailHooks {
  loading: boolean;
  error: ApolloError | undefined;
  data: Media | null;
}

export const AnimeDetailCtx = createContext<AnimeDetailHooks | undefined>(
  undefined
);

export const useAnimeDetailCtx = () => {
  const context = useContext(AnimeDetailCtx);
  if (context === undefined) {
    throw new Error(
      "useAnimeDetailCtx must be used within a AnimeDetailCtxProvider"
    );
  }
  return context;
};
