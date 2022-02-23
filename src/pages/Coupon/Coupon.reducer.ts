import produce from 'immer';
import { AnyAction } from 'redux';
import { IPagination } from '../../shared/interfaces/pagination.interface';
import Message from '../../shared/utils/message.util';
import * as types from './Coupon.constants';

const initialState = {
  isLoading: false,
  listCoupon: [] as ICoupon[],
  message: Message.reset(),
  coupon: null as unknown as ICoupon,
  pagination: {} as IPagination,
};

export const CouponReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_COUPON_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_COUPON_SUCCESS:
        draft.listCoupon = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_COUPON_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_COUPON_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_COUPON_SUCCESS:
        draft.coupon = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_COUPON_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_COUPON_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_COUPON_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Tạo mã giảm giá thành công');
        break;
      case types.CREATE_COUPON_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo mã giảm giá không thành công');
        break;
      case types.EDIT_COUPON_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_COUPON_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật mã giảm giá thành công');
        break;
      case types.EDIT_COUPON_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật mã giảm giá không thành công');
        break;
      case types.DELETE_COUPON_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_COUPON_SUCCESS:
        draft.isLoading = false;
        draft.listCoupon = state.listCoupon.filter(
          (author) => author.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá mã giảm giá thành công');
        break;
      case types.DELETE_COUPON_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá mã giảm giá không thành công');
        break;
      case types.REMOVE_CURRENT_COUPON:
        draft.coupon = null as unknown as ICoupon;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
