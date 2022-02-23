import { combineReducers } from 'redux';
import { AppReducer } from '../../app/App.reducer';
import { CategoryReducer } from '../../pages/Category/Category.reducer';
import { LoginReducer } from '../../pages/Auth/Auth.reducer';
import { AuthorReducer } from '../../pages/Author/Author.reducer';
import { LanguageReducer } from '../../pages/Language/Language.reducer';
import { PublisherReducer } from '../../pages/Publisher/Publisher.reducer';
import { CouponReducer } from '../../pages/Coupon/Coupon.reducer';
import { BookReducer } from '../../pages/Book/Book.reducer';
import { UserReducer } from '../../pages/User/User.reducer';

const rootReducer = combineReducers({
  app: AppReducer,
  auth: LoginReducer,
  category: CategoryReducer,
  author: AuthorReducer,
  language: LanguageReducer,
  publisher: PublisherReducer,
  coupon: CouponReducer,
  book: BookReducer,
  user: UserReducer
});
export default rootReducer;
