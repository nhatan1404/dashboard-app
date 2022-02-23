import { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PATH } from '../constants/paths';
import { Lazy } from '../components/Loading/Lazy';
import Loading from '../components/Loading/Loading';
import { connect, ConnectedProps } from 'react-redux';
import isExpiredToken from '../shared/utils/jwt.util';
import APP from '../constants/app';
const Login = Lazy(() => import('../pages/Auth/Login'), APP.TIMMEOUT);

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const LoginRoutes = ({ isLoggedIn }: Props) => {
  const isLogged = (): boolean => {
    return isLoggedIn && !isExpiredToken();
  };

  return (
    <Switch>
      <Route
        exact
        path={PATH.LOGIN}
        component={() =>
          isLogged() ? (
            <Redirect to={PATH.HOME} />
          ) : (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )
        }
      />
    </Switch>
  );
};

export default connector(LoginRoutes);
