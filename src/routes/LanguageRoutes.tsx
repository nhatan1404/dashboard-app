import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
const LanguageCreate = Lazy(
  () => import('../pages/Language/LanguageCreate'),
  APP.TIMMEOUT,
);
const LanguageEdit = Lazy(
  () => import('../pages/Language/LanguageEdit'),
  APP.TIMMEOUT,
);
const LanguageList = Lazy(
  () => import('../pages/Language/LanguageList'),
  APP.TIMMEOUT,
);

const AuthorRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.LANGUAGE.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <LanguageList />
          </Suspense>
        )}
      />

      <AuthGuard
        exact
        path={PATH.LANGUAGE.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <LanguageCreate />
          </Suspense>
        )}
      />

      <AuthGuard
        exact
        path={`${PATH.LANGUAGE.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <LanguageEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default AuthorRoutes;
