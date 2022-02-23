import { AnyAction } from 'redux';
import * as types from './Auth.constants';

export const loginRequested = (): AnyAction => ({
  type: types.LOGIN_REQUESTED,
});

export const loginSuccess = (payload: { accessToken: string }): AnyAction => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (payload: any): AnyAction => ({
  type: types.LOGIN_FAILED,
  payload,
});

export const logout = (): AnyAction => ({
  type: types.LOGOUT,
});
