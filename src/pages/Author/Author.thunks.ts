import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListAuthorApi,
  createAuthorApi,
  updateAuthorApi,
  deleteAuthorApi,
  getItemAuthorApi,
} from '../../apis/author.api';
import { IAuthorPayload, IQueryAuthor } from '../../shared/interfaces/author.interface';
import * as actions from './Author.actions';

export const getListAuthor =
  (payload?: IQueryAuthor): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemAuthorRequested());
    try {
      const data = await getListAuthorApi(payload);
      return dispatch(actions.getListAuthorSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListAuthorFailed(error)));
    }
  };

export const getItemAuthor =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemAuthorRequested());
    try {
      const data = await getItemAuthorApi(payload);
      return dispatch(actions.getItemAuthorSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemAuthorFailed(error)));
    }
  };

export const createAuthor =
  (payload: IAuthorPayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createAuthorRequested());
    try {
      const data = await createAuthorApi(payload);
      return Promise.resolve(dispatch(actions.createAuthorSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createAuthorFailed(error)));
    }
  };

export const updateAuthor =
  (
    id: number,
    payload: IAuthorPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateAuthorRequested());
    try {
      const data = await updateAuthorApi(id, payload);
      return dispatch(actions.updateAuthorSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateAuthorFailed(error)));
    }
  };

export const deleteAuthor =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteAuthorRequested());
    try {
      const data = await deleteAuthorApi(payload);
      return dispatch(
        actions.deleteAuthorSuccess({ ...data, data: payload.id }),
      );
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteAuthorFailed(error)));
    }
  };
