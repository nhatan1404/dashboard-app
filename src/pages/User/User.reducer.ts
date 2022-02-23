import produce from 'immer';
import { AnyAction } from 'redux';
import { IPagination } from '../../shared/interfaces/pagination.interface';
import Message from '../../shared/utils/message.util';
import * as types from './User.constants';

const initialState = {
  isLoading: false,
  listUser: [] as IUser[],
  message: Message.reset(),
  user: null as unknown as IUser,
  pagination: {} as IPagination,
};

export const UserReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_USER_SUCCESS:
        draft.listUser = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_USER_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_USER_SUCCESS:
        draft.user = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_USER_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_USER_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo tài khoản thành công');
        break;
      case types.CREATE_USER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo tài khoản không thành công');
        break;
      case types.EDIT_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_USER_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật tài khoản thành công');
        break;
      case types.EDIT_USER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật tài khoản không thành công');
        break;
      case types.DELETE_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_USER_SUCCESS:
        draft.isLoading = false;
        draft.listUser = state.listUser.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá tài khoản thành công');
        break;
      case types.DELETE_USER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá tài khoản không thành công');
        break;
      case types.REMOVE_CURRENT_USER:
        draft.user = null as unknown as IUser;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
