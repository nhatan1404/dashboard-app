import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'user';

export const getListUserApi = (): Promise<AxiosResponse<IUser[]>> =>
  getRequest(URL);

export const getItemUserApi = (payload: {
  id: number;
}): Promise<AxiosResponse<IUser>> => getRequest(`${URL}/${payload.id}`);

export const createUserApi = (
  payload: IUserPayload,
): Promise<AxiosResponse<IUser>> => postRequest(URL, payload);

export const updateUserApi = (
  id: number,
  payload: IUserPayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deleteUserApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
