import rootReducer from '../shared/reducer/reducer';

declare global {
  type AppState = ReturnType<typeof rootReducer>;
}
