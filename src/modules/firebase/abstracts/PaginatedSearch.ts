export interface PaginatedSearch {
  page?: {
    lastId?: string;
    size: number;
  };
  search: string;
}
