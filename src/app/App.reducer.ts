import * as types from './App.constants';
import produce from 'immer';
import { AnyAction } from 'redux';

const initialState = {
  isLoading: false,
  isOpenDropdown: false,
  isExpanded: false,
  isOpenMenu: false,
};

export const AppReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.TOGGLE_NAVBAR_DROPDOWN:
        draft.isOpenDropdown = !state.isOpenDropdown;
        break;
      case types.TOGGLE_NAVBAR_MOBILE:
        draft.isExpanded = !state.isExpanded;
        document.documentElement.classList.toggle('aside-mobile-expanded');
        break;
      case types.TOGGLE_NAVBAR_MENU_MOBILE:
        draft.isOpenMenu = !state.isOpenMenu;
        break;
      default:
        return state;
    }
  });
