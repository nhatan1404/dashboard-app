import produce from 'immer';
import { AnyAction } from 'redux';
import { IPagination } from '../../shared/interfaces/pagination.interface';
import Message from '../../shared/utils/message.util';
import * as types from './Publisher.constants';

const initialState = {
  isLoading: false,
  listPublisher: [] as IPublisher[],
  message: Message.reset(),
  publisher: null,
  pagination: {} as IPagination,
};

export const PublisherReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_PUBLISHER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_PUBLISHER_SUCCESS:
        draft.listPublisher = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_PUBLISHER_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_PUBLISHER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_PUBLISHER_SUCCESS:
        draft.publisher = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_PUBLISHER_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_PUBLISHER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_PUBLISHER_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo nhà xuất bản thành công');
        break;
      case types.CREATE_PUBLISHER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo nhà xuất bản không thành công');
        break;
      case types.EDIT_PUBLISHER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_PUBLISHER_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật nhà xuất bản thành công');
        break;
      case types.EDIT_PUBLISHER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật nhà xuất bản không thành công');
        break;
      case types.DELETE_PUBLISHER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_PUBLISHER_SUCCESS:
        draft.isLoading = false;
        draft.listPublisher = state.listPublisher.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá nhà xuất bản thành công');
        break;
      case types.DELETE_PUBLISHER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá nhà xuất bản không thành công');
        break;
      case types.REMOVE_CURRENT_PUBLISHER:
        draft.publisher = null;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
