import { IProductState } from "./interface";

export default {
  getAllProduct(state: IProductState) {
    return state.list;
  },
};
