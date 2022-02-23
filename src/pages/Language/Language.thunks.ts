// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListLanguageApi,
  createLanguageApi,
  updateLanguageApi,
  deleteLanguageApi,
  getItemLanguageApi,
} from '../../apis/language.api';
import * as actions from './Language.actions';

export const getListLanguage =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemLanguageRequested());
    try {
      const data = await getListLanguageApi();
      return dispatch(actions.getListLanguageSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListLanguageFailed(error)));
    }
  };

export const getItemLanguage =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemLanguageRequested());
    try {
      const data = await getItemLanguageApi(payload);
      return dispatch(actions.getItemLanguageSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemLanguageFailed(error)));
    }
  };

export const createLanguage =
  (payload: ILanguagePayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createLanguageRequested());
    try {
      const data = await createLanguageApi(payload);
      return Promise.resolve(dispatch(actions.createLanguageSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createLanguageFailed(error)));
    }
  };

export const updateLanguage =
  (
    id: number,
    payload: ILanguagePayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateLanguageRequested());
    try {
      const data = await updateLanguageApi(id, payload);
      return dispatch(actions.updateLanguageSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateLanguageFailed(error)));
    }
  };

export const deleteLanguage =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteLanguageRequested());
    try {
      const data = await deleteLanguageApi(payload);
      return dispatch(
        actions.deleteLanguageSuccess({ ...data, data: payload.id }),
      );
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteLanguageFailed(error)));
    }
  };
