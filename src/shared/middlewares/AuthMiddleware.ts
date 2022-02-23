import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import isExpiredToken from '../utils/jwt.util';

const AuthMiddleware: Middleware =
  (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action) => {
    if (isExpiredToken()) {
      localStorage.clear();
      next(action);
    }
    next(action);
  };

export default AuthMiddleware;
