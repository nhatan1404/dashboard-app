import { AxiosError, AxiosResponse } from 'axios';
import * as types from './Category.constants';

export const getListCategoryRequested = () => ({
  type: types.GET_LIST_CATEGORY_REQUESTED,
});

export const getListCategorySuccess = (
  payload: AxiosResponse<ICategory[]>,
) => ({
  type: types.GET_LIST_CATEGORY_SUCCESS,
  payload,
});

export const getListCategoryFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_CATEGORY_FAILED,
  payload,
});

export const getListCategoryParentRequested = () => ({
  type: types.GET_LIST_PARENT_CATEGORY_REQUESTED,
});

export const getListCategoryParentSuccess = (
  payload: AxiosResponse<ICategory[]>,
) => ({
  type: types.GET_LIST_PARENT_CATEGORY_SUCCESS,
  payload,
});

export const getListCategoryParentFailed = (payload: AxiosError) => ({
  type: types.GET_LIST_PARENT_CATEGORY_FAILED,
  payload,
});

export const getItemCategoryRequested = () => ({
  type: types.GET_ITEM_CATEGORY_REQUESTED,
});

export const getItemCategorySuccess = (payload: AxiosResponse<ICategory>) => ({
  type: types.GET_ITEM_CATEGORY_SUCCESS,
  payload,
});

export const getItemCategoryFailed = (payload: AxiosError) => ({
  type: types.GET_ITEM_CATEGORY_FAILED,
  payload,
});

export const createCategoryRequested = () => ({
  type: types.CREATE_CATEGORY_REQUESTED,
});

export const createCategorySuccess = (payload: AxiosResponse<ICategory>) => ({
  type: types.CREATE_CATEGORY_SUCCESS,
  payload,
});

export const createCategoryFailed = (payload: AxiosError) => ({
  type: types.CREATE_CATEGORY_FAILED,
  payload,
});

export const updateCategoryRequested = () => ({
  type: types.EDIT_CATEGORY_REQUESTED,
});

export const updateCategorySuccess = (payload: AxiosResponse<ICategory>) => ({
  type: types.EDIT_CATEGORY_SUCCESS,
  payload,
});

export const updateCategoryFailed = (payload: AxiosError) => ({
  type: types.EDIT_CATEGORY_FAILED,
  payload,
});

export const deleteCategoryRequested = () => ({
  type: types.DELETE_CATEGORY_REQUESTED,
});

export const deleteCategorySuccess = (payload: AxiosResponse) => ({
  type: types.DELETE_CATEGORY_SUCCESS,
  payload,
});

export const deleteCategoryFailed = (payload: AxiosError) => ({
  type: types.DELETE_CATEGORY_FAILED,
  payload,
});

export const removeMessage = () => ({
  type: types.REMOVE_MESSAGE,
});

export const removeCurrentCategory = () => ({
  type: types.REMOVE_CURRENT_CATEGORY,
});
