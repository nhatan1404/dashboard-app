import produce from 'immer';
import { AnyAction } from 'redux';
import Message from '../../shared/utils/message.util';
import * as types from './Order.constants';

const initialState = {
  isLoading: false,
  listOrder: [] as IOrder[],
  message: Message.reset(),
  order: null,
};

export const OrderReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_ORDER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_ORDER_SUCCESS:
        draft.listOrder = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_ORDER_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_ORDER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_ORDER_SUCCESS:
        draft.order = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_ORDER_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_ORDER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_ORDER_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo ngôn ngữ thành công');
        break;
      case types.CREATE_ORDER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo ngôn ngữ không thành công');
        break;
      case types.EDIT_ORDER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_ORDER_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật ngôn ngữ thành công');
        break;
      case types.EDIT_ORDER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật ngôn ngữ không thành công');
        break;
      case types.DELETE_ORDER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_ORDER_SUCCESS:
        draft.isLoading = false;
        draft.listOrder = state.listOrder.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá ngôn ngữ thành công');
        break;
      case types.DELETE_ORDER_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá ngôn ngữ không thành công');
        break;
      case types.REMOVE_CURRENT_ORDER:
        draft.order = null;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
