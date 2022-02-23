interface ReqLogin {
  email: string;
  password: string;
}

interface ResLoginApi extends Res {
  data: {
    accessToken: string;
  };
}

interface ResLogin extends ActionRedux {}
