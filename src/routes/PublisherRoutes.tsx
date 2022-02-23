import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
import PublisherCreate from '../pages/Publisher/PublisherCreate';
import PublisherEdit from '../pages/Publisher/PublisherEdit';
const PublisherList = Lazy(
  () => import('../pages/Publisher/PublisherList'),
  APP.TIMMEOUT,
);

const PublisherRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.PUBLISHER.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <PublisherList />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={PATH.PUBLISHER.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <PublisherCreate />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={`${PATH.PUBLISHER.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <PublisherEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default PublisherRoutes;
