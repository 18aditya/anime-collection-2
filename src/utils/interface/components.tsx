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
  handleRemoveModalState?: any;
}

export interface modalModel {
  children: React.ReactNode;
  modalState: Boolean;
  setModalState: any;
}

export interface genreContainerProps {
  display: string;
}
