import { AxiosError, AxiosResponse } from 'axios';
import { IAuthor } from '../../shared/interfaces/author.interface';
import * as types from './Author.constants';

export const getListAuthorRequested = () => ({
  type: types.GET_LIST_AUTHOR_REQUESTED,
});

export const getListAuthorSuccess = (payload: AxiosResponse<IAuthor[]>) => ({
  type: types.GET_LIST_AUTHOR_SUCCESS,
  payload,
});

export const getListAuthorFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_AUTHOR_FAILED,
  payload,
});

export const getItemAuthorRequested = () => ({
  type: types.GET_ITEM_AUTHOR_REQUESTED,
});

export const getItemAuthorSuccess = (payload: AxiosResponse<IAuthor>) => ({
  type: types.GET_ITEM_AUTHOR_SUCCESS,
  payload,
});

export const getItemAuthorFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_AUTHOR_FAILED,
  payload,
});

export const createAuthorRequested = () => ({
  type: types.CREATE_AUTHOR_REQUESTED,
});

export const createAuthorSuccess = (payload: AxiosResponse<IAuthor>) => ({
  type: types.CREATE_AUTHOR_SUCCESS,
  payload,
});

export const createAuthorFailed = (payload: AxiosError) => ({
  type: types.CREATE_AUTHOR_FAILED,
  payload,
});

export const updateAuthorRequested = () => ({
  type: types.EDIT_AUTHOR_REQUESTED,
});

export const updateAuthorSuccess = (payload: AxiosResponse<IAuthor>) => ({
  type: types.EDIT_AUTHOR_SUCCESS,
  payload,
});

export const updateAuthorFailed = (payload: AxiosError) => ({
  type: types.EDIT_AUTHOR_FAILED,
  payload,
});

export const deleteAuthorRequested = () => ({
  type: types.DELETE_AUTHOR_REQUESTED,
});

export const deleteAuthorSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_AUTHOR_SUCCESS,
  payload,
});

export const deleteAuthorFailed = (payload: AxiosError) => ({
  type: types.DELETE_AUTHOR_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentAuthor = () => ({
  type: types.REMOVE_CURRENT_AUTHOR,
});
