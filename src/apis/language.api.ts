import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'language';

export const getListLanguageApi = (): Promise<AxiosResponse<ILanguage[]>> =>
  getRequest(URL);

export const getItemLanguageApi = (payload: {
  id: number;
}): Promise<AxiosResponse<ILanguage>> => getRequest(`${URL}/${payload.id}`);

export const createLanguageApi = (
  payload: ILanguagePayload,
): Promise<AxiosResponse<ILanguage>> => postRequest(URL, payload);

export const updateLanguageApi = (
  id: number,
  payload: ILanguagePayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deleteLanguageApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
