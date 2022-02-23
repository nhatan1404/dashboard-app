import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'publisher';

export const getListPublisherApi = (): Promise<AxiosResponse<IPublisher[]>> =>
  getRequest(URL);

export const getItemPublisherApi = (payload: {
  id: number;
}): Promise<AxiosResponse<IPublisher>> => getRequest(`${URL}/${payload.id}`);

export const createPublisherApi = (
  payload: IPublisherPayload,
): Promise<AxiosResponse<IPublisher>> => postRequest(URL, payload);

export const updatePublisherApi = (
  id: number,
  payload: IPublisherPayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deletePublisherApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
