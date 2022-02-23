import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
const AuthorCreate = Lazy(
  () => import('../pages/Author/AuthorCreate'),
  APP.TIMMEOUT,
);
const AuthorEdit = Lazy(
  () => import('../pages/Author/AuthorEdit'),
  APP.TIMMEOUT,
);
const AuthorList = Lazy(
  () => import('../pages/Author/AuthorList'),
  APP.TIMMEOUT,
);

const AuthorRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.AUTHOR.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <AuthorList />
          </Suspense>
        )}
      />

      <AuthGuard
        exact
        path={PATH.AUTHOR.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <AuthorCreate />
          </Suspense>
        )}
      />

      <AuthGuard
        exact
        path={`${PATH.AUTHOR.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <AuthorEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default AuthorRoutes;
