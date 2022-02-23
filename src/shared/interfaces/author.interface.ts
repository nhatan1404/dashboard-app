import { IQueryPagination } from './pagination.interface';

export interface IAuthor {
  id: number;
  firstname: string;
  lastname: string;
  biography: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthorPayload {
  firstname: string;
  lastname: string;
  biography: string | undefined;
}

export interface IQueryAuthor extends IQueryPagination {
  keyword?: string;
}
