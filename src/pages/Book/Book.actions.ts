import { AxiosError, AxiosResponse } from 'axios';
import * as types from './Book.constants';

export const getListBookRequested = () => ({
  type: types.GET_LIST_BOOK_REQUESTED,
});

export const getListBookSuccess = (
  payload: AxiosResponse<IBook[]>,
) => ({
  type: types.GET_LIST_BOOK_SUCCESS,
  payload,
});

export const getListBookFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_BOOK_FAILED,
  payload,
});

export const getItemBookRequested = () => ({
  type: types.GET_ITEM_BOOK_REQUESTED,
});

export const getItemBookSuccess = (payload: AxiosResponse<IBook>) => ({
  type: types.GET_ITEM_BOOK_SUCCESS,
  payload,
});

export const getItemBookFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_BOOK_FAILED,
  payload,
});

export const createBookRequested = () => ({
  type: types.CREATE_BOOK_REQUESTED,
});

export const createBookSuccess = (payload: AxiosResponse<IBook>) => ({
  type: types.CREATE_BOOK_SUCCESS,
  payload,
});

export const createBookFailed = (payload: AxiosError) => ({
  type: types.CREATE_BOOK_FAILED,
  payload,
});

export const updateBookRequested = () => ({
  type: types.EDIT_BOOK_REQUESTED,
});

export const updateBookSuccess = (payload: AxiosResponse<IBook>) => ({
  type: types.EDIT_BOOK_SUCCESS,
  payload,
});

export const updateBookFailed = (payload: AxiosError) => ({
  type: types.EDIT_BOOK_FAILED,
  payload,
});

export const deleteBookRequested = () => ({
  type: types.DELETE_BOOK_REQUESTED,
});

export const deleteBookSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_BOOK_SUCCESS,
  payload,
});

export const deleteBookFailed = (payload: AxiosError) => ({
  type: types.DELETE_BOOK_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentBook = () => ({
  type: types.REMOVE_CURRENT_BOOK,
});
