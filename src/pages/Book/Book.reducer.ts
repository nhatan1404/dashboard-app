import { IPagination } from './../../shared/interfaces/pagination.interface';
import produce from 'immer';
import { AnyAction } from 'redux';
import Message from '../../shared/utils/message.util';
import * as types from './Book.constants';

const initialState = {
  isLoading: false,
  listBook: [] as IBook[],
  message: Message.reset(),
  book: null as unknown as IBook,
  pagination: {} as IPagination,
};

export const BookReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_BOOK_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_BOOK_SUCCESS:
        draft.listBook = action.payload.data.items;
        draft.isLoading = false;
        break;
      case types.GET_LIST_BOOK_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_BOOK_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_BOOK_SUCCESS:
        draft.book = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_BOOK_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_BOOK_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_BOOK_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo sách thành công');
        break;
      case types.CREATE_BOOK_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo sách không thành công');
        break;
      case types.EDIT_BOOK_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_BOOK_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật sách thành công');
        break;
      case types.EDIT_BOOK_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật sách không thành công');
        break;
      case types.DELETE_BOOK_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_BOOK_SUCCESS:
        draft.isLoading = false;
        draft.listBook = state.listBook.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá sách thành công');
        break;
      case types.DELETE_BOOK_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá sách không thành công');
        break;
      case types.REMOVE_CURRENT_BOOK:
        draft.book = null as unknown as IBook;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
