import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'book';

export const getListBookApi = (): Promise<AxiosResponse<IBook[]>> =>
  getRequest(URL);

export const getItemBookApi = (payload: {
  id: number;
}): Promise<AxiosResponse<IBook>> => getRequest(`${URL}/${payload.id}`);

export const createBookApi = (
  payload: IBookPayload,
): Promise<AxiosResponse<IBook>> => postRequest(URL, payload);

export const updateBookApi = (
  id: number,
  payload: IBookPayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deleteBookApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
