import produce from 'immer';
import { AnyAction } from 'redux';
import isExpiredToken from '../../shared/utils/jwt.util';
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from './Auth.constants';

const initialState = {
  isLoading: false,
  isLoggedIn: !isExpiredToken(),
  error: {} as PayloadError,
};

export const LoginReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_REQUESTED:
        draft.isLoading = true;
        break;
      case LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.isLoggedIn = true;
        localStorage.setItem('token', action.payload.accessToken);
        break;
      case LOGIN_FAILED:
        draft.isLoading = false;
        draft.error = action.payload;
        break;
      case LOGOUT:
        draft.isLoggedIn = false;
        localStorage.removeItem('token');
        break;
      default:
        return state;
    }
  });
