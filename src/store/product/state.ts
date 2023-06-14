import { IProduct, IProductState } from "./interface";

export default (): IProductState => {
  return {
    list: {
      data: [] as IProduct[],
      pagination: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
  };
};
