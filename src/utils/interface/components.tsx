export interface styleDefault {
  width?: string | null;
  marginBlock?: string | null;
  display?: string | null;
}

export interface buttonProps {
  setModalState: () => void;
  styleDefault: styleDefault;
  styleBreakpoint: styleDefault;
}

export interface animeListProps {
  loading: Boolean;
  data: any;
  handleRemoveAnimeCollection?: any;
}

export interface modalModel {
  children: React.ReactNode;
  modalState: Boolean;
  setModalState: () => void;
}

export interface genreContainerProps {
  display: string;
}
