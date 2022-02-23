import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AuthGuard from '../shared/guards/AuthGuard';
import { PATH } from '../constants/paths';
import Loading from '../components/Loading/Loading';
import { Lazy } from '../components/Loading/Lazy';
import APP from '../constants/app';
const BookList = Lazy(() => import('../pages/Book/BookList'), APP.TIMMEOUT);
const BookCreate = Lazy(() => import('../pages/Book/BookCreate'), APP.TIMMEOUT);
const BookEdit = Lazy(() => import('../pages/Book/BookEdit'), APP.TIMMEOUT);

const BookRoutes = () => {
  return (
    <Switch>
      <AuthGuard
        exact
        path={PATH.BOOK.INDEX}
        component={() => (
          <Suspense fallback={<Loading />}>
            <BookList />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={PATH.BOOK.CREATE}
        component={() => (
          <Suspense fallback={<Loading />}>
            <BookCreate />
          </Suspense>
        )}
      />
      <AuthGuard
        exact
        path={`${PATH.BOOK.EDIT}/:id`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <BookEdit />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default BookRoutes;
