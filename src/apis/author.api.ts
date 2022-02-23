import { AxiosResponse } from 'axios';
import {
  IAuthor,
  IAuthorPayload,
  IQueryAuthor,
} from '../shared/interfaces/author.interface';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const path: string = 'author';

export const getListAuthorApi = (
  payload?: IQueryAuthor,
): Promise<AxiosResponse<IAuthor[]>> =>
  getRequest(`${path}?${new URLSearchParams(payload)}`);

export const getItemAuthorApi = (payload: {
  id: number;
}): Promise<AxiosResponse<IAuthor>> => getRequest(`${path}/${payload.id}`);

export const createAuthorApi = (
  payload: IAuthorPayload,
): Promise<AxiosResponse<IAuthor>> => postRequest(path, payload);

export const updateAuthorApi = (
  id: number,
  payload: IAuthorPayload,
): Promise<AxiosResponse> => putRequest(`${path}/${id}`, payload);

export const deleteAuthorApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${path}/${payload.id}`);
