import React, { createContext, useContext } from "react";
import { Media, PageProperties } from "../interface/Interface";

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

export const AnimeListContext = createContext<AnimeListHooks | undefined>(
  undefined
);

export const useAnimeListContext = () => {
  const context = useContext(AnimeListContext);
  if (context === undefined) {
    throw new Error("useAnimeListCtx must be used within a AnimeListProvider");
  }
  return context;
};
