import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'order';

export const getListOrderApi = (): Promise<AxiosResponse<IOrder[]>> =>
  getRequest(URL);

export const getItemOrderApi = (payload: {
  id: number;
}): Promise<AxiosResponse<IOrder>> => getRequest(`${URL}/${payload.id}`);

export const createOrderApi = (
  payload: IOrderPayload,
): Promise<AxiosResponse<IOrder>> => postRequest(URL, payload);

export const updateOrderApi = (
  id: number,
  payload: IOrderPayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deleteOrderApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
