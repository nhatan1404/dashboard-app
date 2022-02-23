// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getListPublisherApi,
  createPublisherApi,
  updatePublisherApi,
  deletePublisherApi,
  getItemPublisherApi,
} from '../../apis/publisher.api';
import * as actions from './Publisher.actions';

export const getListPublisher =
  (): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.getItemPublisherRequested());
    try {
      const data = await getListPublisherApi();
      return dispatch(actions.getListPublisherSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getListPublisherFailed(error)));
    }
  };

export const getItemPublisher =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.getItemPublisherRequested());
    try {
      const data = await getItemPublisherApi(payload);
      return dispatch(actions.getItemPublisherSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.getItemPublisherFailed(error)));
    }
  };

export const createPublisher =
  (payload: IPublisherPayload): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.createPublisherRequested());
    try {
      const data = await createPublisherApi(payload);
      return Promise.resolve(dispatch(actions.createPublisherSuccess(data)));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.createPublisherFailed(error)));
    }
  };

export const updatePublisher =
  (
    id: number,
    payload: IPublisherPayload,
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.updatePublisherRequested());
    try {
      const data = await updatePublisherApi(id, payload);
      return dispatch(actions.updatePublisherSuccess(data));
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.updatePublisherFailed(error)));
    }
  };

export const deletePublisher =
  (payload: { id: number }): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch(actions.deletePublisherRequested());
    try {
      const data = await deletePublisherApi(payload);
      return dispatch(
        actions.deletePublisherSuccess({ ...data, data: payload.id }),
      );
    } catch (error: any | AxiosError) {
      return Promise.reject(dispatch(actions.deletePublisherFailed(error)));
    }
  };
