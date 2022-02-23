import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
const UserList = Lazy(
  () => import('../pages/User/UserList'),
  APP.TIMMEOUT,
);
const UserCreate = Lazy(
  () => import('../pages/User/UserCreate'),
  APP.TIMMEOUT,
);
const UserEdit = Lazy(
  () => import('../pages/User/UserEdit'),
  APP.TIMMEOUT,
);

const UserRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.USER.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <UserList />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={PATH.USER.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <UserCreate />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={`${PATH.USER.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <UserEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default UserRoutes;
