import { AxiosError, AxiosResponse } from 'axios';
import * as types from './Language.constants';

export const getListLanguageRequested = () => ({
  type: types.GET_LIST_LANGUAGE_REQUESTED,
});

export const getListLanguageSuccess = (
  payload: AxiosResponse<ILanguage[]>,
) => ({
  type: types.GET_LIST_LANGUAGE_SUCCESS,
  payload,
});

export const getListLanguageFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_LANGUAGE_FAILED,
  payload,
});

export const getItemLanguageRequested = () => ({
  type: types.GET_ITEM_LANGUAGE_REQUESTED,
});

export const getItemLanguageSuccess = (payload: AxiosResponse<ILanguage>) => ({
  type: types.GET_ITEM_LANGUAGE_SUCCESS,
  payload,
});

export const getItemLanguageFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_LANGUAGE_FAILED,
  payload,
});

export const createLanguageRequested = () => ({
  type: types.CREATE_LANGUAGE_REQUESTED,
});

export const createLanguageSuccess = (payload: AxiosResponse<ILanguage>) => ({
  type: types.CREATE_LANGUAGE_SUCCESS,
  payload,
});

export const createLanguageFailed = (payload: AxiosError) => ({
  type: types.CREATE_LANGUAGE_FAILED,
  payload,
});

export const updateLanguageRequested = () => ({
  type: types.EDIT_LANGUAGE_REQUESTED,
});

export const updateLanguageSuccess = (payload: AxiosResponse<ILanguage>) => ({
  type: types.EDIT_LANGUAGE_SUCCESS,
  payload,
});

export const updateLanguageFailed = (payload: AxiosError) => ({
  type: types.EDIT_LANGUAGE_FAILED,
  payload,
});

export const deleteLanguageRequested = () => ({
  type: types.DELETE_LANGUAGE_REQUESTED,
});

export const deleteLanguageSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_LANGUAGE_SUCCESS,
  payload,
});

export const deleteLanguageFailed = (payload: AxiosError) => ({
  type: types.DELETE_LANGUAGE_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentLanguage = () => ({
  type: types.REMOVE_CURRENT_LANGUAGE,
});
