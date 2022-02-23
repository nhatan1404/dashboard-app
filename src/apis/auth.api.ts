import axios from 'axios';
import APP from '../constants/app';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject({
        statusCode: 401,
        message: 'Email hoặc mật khẩu không chính xác',
        error: 'Unauthorized',
      });
    }
    return Promise.reject(error);
  },
);

export const loginApi = ({
  email,
  password,
}: ReqLogin): Promise<ResLoginApi | any> => {
  return axios.post(`${APP.API_URL}/auth/login`, { email, password });
};
