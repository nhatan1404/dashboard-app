import { AxiosError, AxiosResponse } from 'axios';
import * as types from './User.constants';

export const getListUserRequested = () => ({
  type: types.GET_LIST_USER_REQUESTED,
});

export const getListUserSuccess = (
  payload: AxiosResponse<IUser[]>,
) => ({
  type: types.GET_LIST_USER_SUCCESS,
  payload,
});

export const getListUserFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_USER_FAILED,
  payload,
});

export const getItemUserRequested = () => ({
  type: types.GET_ITEM_USER_REQUESTED,
});

export const getItemUserSuccess = (payload: AxiosResponse<IUser>) => ({
  type: types.GET_ITEM_USER_SUCCESS,
  payload,
});

export const getItemUserFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_USER_FAILED,
  payload,
});

export const createUserRequested = () => ({
  type: types.CREATE_USER_REQUESTED,
});

export const createUserSuccess = (payload: AxiosResponse<IUser>) => ({
  type: types.CREATE_USER_SUCCESS,
  payload,
});

export const createUserFailed = (payload: AxiosError) => ({
  type: types.CREATE_USER_FAILED,
  payload,
});

export const updateUserRequested = () => ({
  type: types.EDIT_USER_REQUESTED,
});

export const updateUserSuccess = (payload: AxiosResponse<IUser>) => ({
  type: types.EDIT_USER_SUCCESS,
  payload,
});

export const updateUserFailed = (payload: AxiosError) => ({
  type: types.EDIT_USER_FAILED,
  payload,
});

export const deleteUserRequested = () => ({
  type: types.DELETE_USER_REQUESTED,
});

export const deleteUserSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_USER_SUCCESS,
  payload,
});

export const deleteUserFailed = (payload: AxiosError) => ({
  type: types.DELETE_USER_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER,
});
