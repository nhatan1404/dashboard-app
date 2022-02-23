import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import APP from '../../constants/app';

const config: AxiosRequestConfig = {
  baseURL: APP.API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //withCredentials: true,
};

const Http: AxiosInstance = axios.create(config);

export function getRequest(URL: string) {
  return Http.get(`/${URL}`);
}

export function postRequest(URL: string, payload: Record<string, any>) {
  return Http.post(`/${URL}`, payload);
}

export function patchRequest(URL: string, payload: Record<string, any>) {
  return Http.patch(`/${URL}`, payload);
}

export function putRequest(URL: string, payload: Record<string, any>) {
  return Http.put(`/${URL}`, payload);
}

export function deleteRequest(URL: string) {
  return Http.delete(`/${URL}`);
}

export default Http;
