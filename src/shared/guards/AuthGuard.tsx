import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { PATH } from '../../constants/paths';
import isExpiredToken from '../utils/jwt.util';

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector>, RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

function AuthGuard({ isLoggedIn, component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn && isExpiredToken()) {
          return <Redirect to={PATH.LOGIN} />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default connector(AuthGuard);
