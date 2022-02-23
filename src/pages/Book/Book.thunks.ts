import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListBookApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
  getItemBookApi,
} from '../../apis/book.api';
import * as actions from './Book.actions';

export const getListBook =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemBookRequested());
    try {
      const data = await getListBookApi();
      return dispatch(actions.getListBookSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListBookFailed(error)));
    }
  };

export const getItemBook =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemBookRequested());
    try {
      const data = await getItemBookApi(payload);
      return dispatch(actions.getItemBookSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemBookFailed(error)));
    }
  };

export const createBook =
  (payload: IBookPayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createBookRequested());
    try {
      const data = await createBookApi(payload);
      return Promise.resolve(dispatch(actions.createBookSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createBookFailed(error)));
    }
  };

export const updateBook =
  (
    id: number,
    payload: IBookPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateBookRequested());
    try {
      const data = await updateBookApi(id, payload);
      return dispatch(actions.updateBookSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateBookFailed(error)));
    }
  };

export const deleteBook =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteBookRequested());
    try {
      const data = await deleteBookApi(payload);
      return dispatch(actions.deleteBookSuccess({ ...data, data: payload.id }));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteBookFailed(error)));
    }
  };
