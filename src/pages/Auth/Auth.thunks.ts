import { AnyAction, Dispatch } from 'redux';
import { loginApi } from '../../apis/auth.api';
import * as actions from './Auth.actions';

export const login =
  (payload: ReqLogin) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.loginRequested());
    try {
      const {
        data: { accessToken },
      } = await loginApi(payload);

      return dispatch(actions.loginSuccess({ accessToken }));
    } catch (error) {
      return Promise.reject(dispatch(actions.loginFailed(error)));
    }
  };

export const logout = () => (dispatch: Dispatch<AnyAction>) => {
  return dispatch(actions.logout());
};
