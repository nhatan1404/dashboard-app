import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
const CategoryList = Lazy(
  () => import('../pages/Category/CategoryList'),
  APP.TIMMEOUT,
);
const CategoryCreate = Lazy(
  () => import('../pages/Category/CategoryCreate'),
  APP.TIMMEOUT,
);
const CategoryEdit = Lazy(
  () => import('../pages/Category/CategotyEdit'),
  APP.TIMMEOUT,
);

const CategoryRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.CATEGORY.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <CategoryList />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={PATH.CATEGORY.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <CategoryCreate />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={`${PATH.CATEGORY.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <CategoryEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default CategoryRoutes;
