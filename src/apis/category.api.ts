import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'category';

export const getListCategoryApi = (): Promise<AxiosResponse<ICategory[]>> =>
  getRequest(URL);

export const getListParentCategoryApi = (): Promise<
  AxiosResponse<ICategory[]>
> => getRequest(URL + '/parents');

export const getItemCategoryApi = (payload: {
  id: number;
}): Promise<AxiosResponse<ICategory>> => getRequest(`${URL}/${payload.id}`);

export const createCategoryApi = (
  payload: ICategoryPayload,
): Promise<AxiosResponse<ICategory>> => postRequest(URL, payload);

export const updateCategoryApi = (
  id: number,
  payload: ICategoryPayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deleteCategoryApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
