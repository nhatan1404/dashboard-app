import { AxiosError, AxiosResponse } from 'axios';
import * as types from './Coupon.constants';

export const getListCouponRequested = () => ({
  type: types.GET_LIST_COUPON_REQUESTED,
});

export const getListCouponSuccess = (
  payload: AxiosResponse<ICoupon[]>,
) => ({
  type: types.GET_LIST_COUPON_SUCCESS,
  payload,
});

export const getListCouponFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_COUPON_FAILED,
  payload,
});

export const getItemCouponRequested = () => ({
  type: types.GET_ITEM_COUPON_REQUESTED,
});

export const getItemCouponSuccess = (payload: AxiosResponse<ICoupon>) => ({
  type: types.GET_ITEM_COUPON_SUCCESS,
  payload,
});

export const getItemCouponFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_COUPON_FAILED,
  payload,
});

export const createCouponRequested = () => ({
  type: types.CREATE_COUPON_REQUESTED,
});

export const createCouponSuccess = (payload: AxiosResponse<ICoupon>) => ({
  type: types.CREATE_COUPON_SUCCESS,
  payload,
});

export const createCouponFailed = (payload: AxiosError) => ({
  type: types.CREATE_COUPON_FAILED,
  payload,
});

export const updateCouponRequested = () => ({
  type: types.EDIT_COUPON_REQUESTED,
});

export const updateCouponSuccess = (payload: AxiosResponse<ICoupon>) => ({
  type: types.EDIT_COUPON_SUCCESS,
  payload,
});

export const updateCouponFailed = (payload: AxiosError) => ({
  type: types.EDIT_COUPON_FAILED,
  payload,
});

export const deleteCouponRequested = () => ({
  type: types.DELETE_COUPON_REQUESTED,
});

export const deleteCouponSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_COUPON_SUCCESS,
  payload,
});

export const deleteCouponFailed = (payload: AxiosError) => ({
  type: types.DELETE_COUPON_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentCoupon = () => ({
  type: types.REMOVE_CURRENT_COUPON,
});
