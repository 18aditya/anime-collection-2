import React, { createContext, useContext } from "react";
import { Media, PageProperties } from "../interface/interface";

interface DataModel {
  Data: Media[];
  Page: PageProperties;
}

interface AnimeListHooks {
  data: DataModel | null;
  loading: boolean;
  error: any;
  pageDropdown: boolean;
  page: number;
  perPage: number;
  setPageDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeDataperPage: (data: number) => void;
  handlePageBack: () => void;
  handlePageNext: () => void;
  handleFirstPage: () => void;
  handleLastPage: () => void;
}

export const AnimeListCtx = createContext<AnimeListHooks | undefined>(
  undefined
);

export const useAnimeListCtx = () => {
  const context = useContext(AnimeListCtx);
  if (context === undefined) {
    throw new Error("useAnimeListCtx must be used within a AnimeListProvider");
  }
  return context;
};
