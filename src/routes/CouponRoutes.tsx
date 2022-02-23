import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
const CouponList = Lazy(
  () => import('../pages/Coupon/CouponList'),
  APP.TIMMEOUT,
);
const CouponCreate = Lazy(
  () => import('../pages/Coupon/CouponCreate'),
  APP.TIMMEOUT,
);
const CouponEdit = Lazy(
  () => import('../pages/Coupon/CouponEdit'),
  APP.TIMMEOUT,
);

const CouponRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.COUPON.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <CouponList />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={PATH.COUPON.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <CouponCreate />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={`${PATH.COUPON.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <CouponEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default CouponRoutes;
