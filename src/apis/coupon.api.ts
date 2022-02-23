import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../shared/utils/http.util';

const URL: string = 'coupon';

export const getListCouponApi = (): Promise<AxiosResponse<ICoupon[]>> =>
  getRequest(URL);

export const getItemCouponApi = (payload: {
  id: number;
}): Promise<AxiosResponse<ICoupon>> => getRequest(`${URL}/${payload.id}`);

export const createCouponApi = (
  payload: ICouponPayload,
): Promise<AxiosResponse<ICoupon>> => postRequest(URL, payload);

export const updateCouponApi = (
  id: number,
  payload: ICouponPayload,
): Promise<AxiosResponse> => putRequest(`${URL}/${id}`, payload);

export const deleteCouponApi = (payload: {
  id: number;
}): Promise<AxiosResponse> => deleteRequest(`${URL}/${payload.id}`);
