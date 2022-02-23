export interface IPagination {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IQueryPagination extends Record<string, any> {
  page?: number;
  limit?: number;
}
