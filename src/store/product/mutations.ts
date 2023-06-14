import { IProduct, IProductState, IProductPagination } from "./interface";

export default {
  GET_ALL_PRODUCT_PENDING(state: IProductState) {
    state.list = {
      ...state.list,
      isLoading: true,
    };
  },
  GET_ALL_PRODUCT_FULFILLED(
    state: IProductState,
    payload: { data: IProduct[]; pagination: IProductPagination }
  ) {
    state.list = {
      ...state.list,
      isLoading: false,
      data: payload.data,
      pagination: payload.pagination,
    };
  },
  GET_ALL_PRODUCT_REJECTED(state: IProductState, payload: string) {
    state.list = {
      ...state.list,
      isLoading: false,
      isError: true,
      errorMessage: payload,
    };
  },
};
