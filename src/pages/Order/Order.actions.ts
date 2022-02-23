import { AxiosError, AxiosResponse } from 'axios';
import * as types from './Order.constants';

export const getListOrderRequested = () => ({
  type: types.GET_LIST_ORDER_REQUESTED,
});

export const getListOrderSuccess = (
  payload: AxiosResponse<IOrder[]>,
) => ({
  type: types.GET_LIST_ORDER_SUCCESS,
  payload,
});

export const getListOrderFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_ORDER_FAILED,
  payload,
});

export const getItemOrderRequested = () => ({
  type: types.GET_ITEM_ORDER_REQUESTED,
});

export const getItemOrderSuccess = (payload: AxiosResponse<IOrder>) => ({
  type: types.GET_ITEM_ORDER_SUCCESS,
  payload,
});

export const getItemOrderFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_ORDER_FAILED,
  payload,
});

export const createOrderRequested = () => ({
  type: types.CREATE_ORDER_REQUESTED,
});

export const createOrderSuccess = (payload: AxiosResponse<IOrder>) => ({
  type: types.CREATE_ORDER_SUCCESS,
  payload,
});

export const createOrderFailed = (payload: AxiosError) => ({
  type: types.CREATE_ORDER_FAILED,
  payload,
});

export const updateOrderRequested = () => ({
  type: types.EDIT_ORDER_REQUESTED,
});

export const updateOrderSuccess = (payload: AxiosResponse<IOrder>) => ({
  type: types.EDIT_ORDER_SUCCESS,
  payload,
});

export const updateOrderFailed = (payload: AxiosError) => ({
  type: types.EDIT_ORDER_FAILED,
  payload,
});

export const deleteOrderRequested = () => ({
  type: types.DELETE_ORDER_REQUESTED,
});

export const deleteOrderSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_ORDER_SUCCESS,
  payload,
});

export const deleteOrderFailed = (payload: AxiosError) => ({
  type: types.DELETE_ORDER_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentOrder = () => ({
  type: types.REMOVE_CURRENT_ORDER,
});
