// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  getItemUserApi,
} from '../../apis/user.api';
import * as actions from './User.actions';

export const getListUser =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemUserRequested());
    try {
      const data = await getListUserApi();
      return dispatch(actions.getListUserSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListUserFailed(error)));
    }
  };

export const getItemUser =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemUserRequested());
    try {
      const data = await getItemUserApi(payload);
      return dispatch(actions.getItemUserSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemUserFailed(error)));
    }
  };

export const createUser =
  (payload: IUserPayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createUserRequested());
    try {
      const data = await createUserApi(payload);
      return Promise.resolve(dispatch(actions.createUserSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createUserFailed(error)));
    }
  };

export const updateUser =
  (
    id: number,
    payload: IUserPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateUserRequested());
    try {
      const data = await updateUserApi(id, payload);
      return dispatch(actions.updateUserSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateUserFailed(error)));
    }
  };

export const deleteUser =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteUserRequested());
    try {
      const data = await deleteUserApi(payload);
      return dispatch(actions.deleteUserSuccess({ ...data, data: payload.id }));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteUserFailed(error)));
    }
  };
