import { AxiosError, AxiosResponse } from 'axios';
import * as types from './Publisher.constants';

export const getListPublisherRequested = () => ({
  type: types.GET_LIST_PUBLISHER_REQUESTED,
});

export const getListPublisherSuccess = (
  payload: AxiosResponse<IPublisher[]>,
) => ({
  type: types.GET_LIST_PUBLISHER_SUCCESS,
  payload,
});

export const getListPublisherFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_PUBLISHER_FAILED,
  payload,
});

export const getItemPublisherRequested = () => ({
  type: types.GET_ITEM_PUBLISHER_REQUESTED,
});

export const getItemPublisherSuccess = (payload: AxiosResponse<IPublisher>) => ({
  type: types.GET_ITEM_PUBLISHER_SUCCESS,
  payload,
});

export const getItemPublisherFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_PUBLISHER_FAILED,
  payload,
});

export const createPublisherRequested = () => ({
  type: types.CREATE_PUBLISHER_REQUESTED,
});

export const createPublisherSuccess = (payload: AxiosResponse<IPublisher>) => ({
  type: types.CREATE_PUBLISHER_SUCCESS,
  payload,
});

export const createPublisherFailed = (payload: AxiosError) => ({
  type: types.CREATE_PUBLISHER_FAILED,
  payload,
});

export const updatePublisherRequested = () => ({
  type: types.EDIT_PUBLISHER_REQUESTED,
});

export const updatePublisherSuccess = (payload: AxiosResponse<IPublisher>) => ({
  type: types.EDIT_PUBLISHER_SUCCESS,
  payload,
});

export const updatePublisherFailed = (payload: AxiosError) => ({
  type: types.EDIT_PUBLISHER_FAILED,
  payload,
});

export const deletePublisherRequested = () => ({
  type: types.DELETE_PUBLISHER_REQUESTED,
});

export const deletePublisherSuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_PUBLISHER_SUCCESS,
  payload,
});

export const deletePublisherFailed = (payload: AxiosError) => ({
  type: types.DELETE_PUBLISHER_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentPublisher = () => ({
  type: types.REMOVE_CURRENT_PUBLISHER,
});
