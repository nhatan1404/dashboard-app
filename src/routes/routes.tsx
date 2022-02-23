import { BrowserRouter } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';
import LoginRoutes from './LoginRoutes';
import BookRoutes from './BookRoutes';
import CategoryRoutes from './CategoryRoutes';
import AuthorRoutes from './AuthorRoutes';
import PublisherRoutes from './PublisherRoutes';
import LanguageRoutes from './LanguageRoutes';
import CouponRoutes from './CouponRoutes';
import UserRoutes from './UserRoutes';

const Routes = () => {
  return (
    <BrowserRouter>
      <LoginRoutes />
      <HomeRoutes />
      <BookRoutes />
      <CategoryRoutes />
      <AuthorRoutes />
      <PublisherRoutes />
      <LanguageRoutes />
      <CouponRoutes />
      <UserRoutes />
    </BrowserRouter>
  );
};

export default Routes;
