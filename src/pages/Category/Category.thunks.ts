// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListCategoryApi,
  getListParentCategoryApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  getItemCategoryApi,
} from '../../apis/category.api';
import * as actions from './Category.actions';

export const getListAllCategory =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getListCategoryRequested());
    try {
      const data = await getListCategoryApi();
      return dispatch(actions.getListCategorySuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListCategoryFailed(error)));
    }
  };

export const getListParentCategory =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getListCategoryParentRequested());
    try {
      const data = await getListParentCategoryApi();
      return dispatch(actions.getListCategoryParentSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(
        dispatch(actions.getListCategoryParentFailed(error)),
      );
    }
  };

export const getItemCategory =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemCategoryRequested());
    try {
      const data = await getItemCategoryApi(payload);

      return dispatch(actions.getItemCategorySuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemCategoryFailed(error)));
    }
  };

export const createCategory =
  (
    payload: ICategoryPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createCategoryRequested());
    try {
      console.log(payload);
      const data = await createCategoryApi(payload);
      return dispatch(actions.createCategorySuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createCategoryFailed(error)));
    }
  };

export const updateCategory =
  (
    id: number,
    payload: ICategoryPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updateCategoryRequested());
    try {
      const data = await updateCategoryApi(id, payload);
      return dispatch(actions.updateCategorySuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updateCategoryFailed(error)));
    }
  };

export const deleteCategory =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deleteCategoryRequested());
    try {
      const data = await deleteCategoryApi(payload);
      return dispatch(actions.deleteCategorySuccess({ ...data, data: payload.id }));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deleteCategoryFailed(error)));
    }
  };
