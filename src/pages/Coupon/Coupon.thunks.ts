// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListCouponApi,
  createCouponApi,
  updateCouponApi,
  deleteCouponApi,
  getItemCouponApi,
} from '../../apis/coupon.api';
import * as actions from './Coupon.actions';

export const getListCoupon =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemCouponRequested());
    try {
      const data = await getListCouponApi();
      return dispatch(actions.getListCouponSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListCouponFailed(error)));
    }
  };

export const getItemCoupon =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemCouponRequested());
    try {
      const data = await getItemCouponApi(payload);
      return dispatch(actions.getItemCouponSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemCouponFailed(error)));
    }
  };

export const createCoupon =
  (payload: ICouponPayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createCouponRequested());
    try {
      const data = await createCouponApi(payload);
      return Promise.resolve(dispatch(actions.createCouponSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createCouponFailed(error)));
    }
  };

export const updateCoupon =
  (
    id: number,
    payload: ICouponPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateCouponRequested());
    try {
      const data = await updateCouponApi(id, payload);
      return dispatch(actions.updateCouponSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateCouponFailed(error)));
    }
  };

export const deleteCoupon =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteCouponRequested());
    try {
      const data = await deleteCouponApi(payload);
      return dispatch(
        actions.deleteCouponSuccess({ ...data, data: payload.id }),
      );
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteCouponFailed(error)));
    }
  };
