import produce from 'immer';
import { AnyAction } from 'redux';
import { IPagination } from '../../shared/interfaces/pagination.interface';
import Message from '../../shared/utils/message.util';
import * as types from './Language.constants';

const initialState = {
  isLoading: false,
  listLanguage: [] as ILanguage[],
  message: Message.reset(),
  language: null,
  pagination: {} as IPagination,
};

export const LanguageReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_LANGUAGE_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_LANGUAGE_SUCCESS:
        draft.listLanguage = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_LANGUAGE_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_LANGUAGE_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_LANGUAGE_SUCCESS:
        draft.language = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_LANGUAGE_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_LANGUAGE_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_LANGUAGE_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo ngôn ngữ thành công');
        break;
      case types.CREATE_LANGUAGE_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo ngôn ngữ không thành công');
        break;
      case types.EDIT_LANGUAGE_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_LANGUAGE_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật ngôn ngữ thành công');
        break;
      case types.EDIT_LANGUAGE_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật ngôn ngữ không thành công');
        break;
      case types.DELETE_LANGUAGE_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_LANGUAGE_SUCCESS:
        draft.isLoading = false;
        draft.listLanguage = state.listLanguage.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá ngôn ngữ thành công');
        break;
      case types.DELETE_LANGUAGE_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá ngôn ngữ không thành công');
        break;
      case types.REMOVE_CURRENT_LANGUAGE:
        draft.language = null;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
