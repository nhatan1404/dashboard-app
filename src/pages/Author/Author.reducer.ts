import { IPagination } from './../../shared/interfaces/pagination.interface';
import produce from 'immer';
import { AnyAction } from 'redux';
import Message from '../../shared/utils/message.util';
import * as types from './Author.constants';
import { IAuthor } from '../../shared/interfaces/author.interface';

const initialState = {
  isLoading: false,
  listAuthor: [] as IAuthor[],
  message: Message.reset(),
  author: null,
  pagination: {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0,
  } as IPagination,
};

export const AuthorReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_AUTHOR_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_AUTHOR_SUCCESS:
        draft.listAuthor = action.payload.data.items;
        draft.pagination = action.payload.data.meta;
        draft.isLoading = false;
        break;
      case types.GET_LIST_AUTHOR_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_AUTHOR_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_AUTHOR_SUCCESS:
        draft.author = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_AUTHOR_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_AUTHOR_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_AUTHOR_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo tác giả thành công');
        break;
      case types.CREATE_AUTHOR_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo tác giả không thành công');
        break;
      case types.EDIT_AUTHOR_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_AUTHOR_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật tác giả thành công');
        break;
      case types.EDIT_AUTHOR_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật tác giả không thành công');
        break;
      case types.DELETE_AUTHOR_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_AUTHOR_SUCCESS:
        draft.isLoading = false;
        draft.listAuthor = state.listAuthor.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá tác giả thành công');
        break;
      case types.DELETE_AUTHOR_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá tác giả không thành công');
        break;
      case types.REMOVE_CURRENT_AUTHOR:
        draft.author = null;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
