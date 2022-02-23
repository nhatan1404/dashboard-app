import produce from 'immer';
import { AnyAction } from 'redux';
import { IPagination } from '../../shared/interfaces/pagination.interface';
import Message from '../../shared/utils/message.util';
import * as types from './Category.constants';

const initialState = {
  isLoading: false,
  listCategory: [] as ICategory[],
  listParents: [] as ICategory[],
  message: Message.reset(),
  category: null,
  pagination: {} as IPagination,
};

export const CategoryReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_LIST_CATEGORY_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_CATEGORY_SUCCESS:
        draft.listCategory = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_CATEGORY_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_LIST_PARENT_CATEGORY_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_LIST_PARENT_CATEGORY_SUCCESS:
        draft.listParents = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_PARENT_CATEGORY_FAILED:
        draft.isLoading = false;
        break;
      case types.GET_ITEM_CATEGORY_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_ITEM_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        draft.isLoading = false;
        break;
      case types.GET_ITEM_CATEGORY_FAILED:
        draft.isLoading = false;
        break;
      case types.CREATE_CATEGORY_REQUESTED:
        draft.isLoading = true;
        break;
      case types.CREATE_CATEGORY_SUCCESS:
        let categoryCreated: ICategory = action.payload.data;
        draft.message = Message.success('Tạo danh mục thành công');
        draft.listCategory.push(categoryCreated);
        draft.isLoading = false;
        break;
      case types.CREATE_CATEGORY_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Tạo danh mục không thành công');
        break;
      case types.EDIT_CATEGORY_REQUESTED:
        draft.isLoading = true;
        break;
      case types.EDIT_CATEGORY_SUCCESS:
        draft.isLoading = false;
        draft.message = Message.success('Cập nhật danh mục thành công');
        break;
      case types.EDIT_CATEGORY_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Cập nhật danh mục không thành công');
        break;
      case types.DELETE_CATEGORY_REQUESTED:
        draft.isLoading = true;
        break;
      case types.DELETE_CATEGORY_SUCCESS:
        draft.isLoading = false;
        draft.listCategory = state.listCategory.filter(
          (category) => category.id !== action.payload.data,
        );
        draft.message = Message.success('Xoá danh mục thành công');
        break;
      case types.DELETE_CATEGORY_FAILED:
        draft.isLoading = false;
        draft.message = Message.error('Xoá danh mục không thành công');
        break;
      case types.REMOVE_CURRENT_CATEGORY:
        draft.category = null;
        break;
      case types.REMOVE_MESSAGE:
        draft.message = Message.reset();
        break;
      default:
        return state;
    }
  });
