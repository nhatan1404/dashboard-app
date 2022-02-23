import jwt_decode from 'jwt-decode';

type Token = {
  email: string;
  exp: number;
  iat: number;
  roles: string;
  sub: string;
};

const isExpiredToken = (): boolean => {
  const token: string | null = localStorage.getItem('token');
  if (!token) return true;
  const { exp }: Token = jwt_decode(token);
  return exp * 1000 < Date.now();
};

export default isExpiredToken;
