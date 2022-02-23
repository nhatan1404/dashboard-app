// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListOrderApi,
  createOrderApi,
  updateOrderApi,
  deleteOrderApi,
  getItemOrderApi,
} from '../../apis/order.api';
import * as actions from './Order.actions';

export const getListOrder =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemOrderRequested());
    try {
      const data = await getListOrderApi();
      return dispatch(actions.getListOrderSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListOrderFailed(error)));
    }
  };

export const getItemOrder =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemOrderRequested());
    try {
      const data = await getItemOrderApi(payload);
      return dispatch(actions.getItemOrderSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemOrderFailed(error)));
    }
  };

export const createOrder =
  (payload: IOrderPayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createOrderRequested());
    try {
      const data = await createOrderApi(payload);
      return Promise.resolve(dispatch(actions.createOrderSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createOrderFailed(error)));
    }
  };

export const updateOrder =
  (
    id: number,
    payload: IOrderPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateOrderRequested());
    try {
      const data = await updateOrderApi(id, payload);
      return dispatch(actions.updateOrderSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateOrderFailed(error)));
    }
  };

export const deleteOrder =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteOrderRequested());
    try {
      const data = await deleteOrderApi(payload);
      return dispatch(
        actions.deleteOrderSuccess({ ...data, data: payload.id }),
      );
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteOrderFailed(error)));
    }
  };
