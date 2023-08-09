export interface inputPage {
  page?: number;
  perPage?: number;
}

export interface outputPage {
  currentPage: number;
  hasNextPage: Boolean;
  lastPage: number;
  perPage: number;
  total: number;
}

