export interface IProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  picture: string;
  created_at: string;
  updated_at: string;
}
export interface IProductPagination {
  currentPage: string | number;
  limit: string | number;
  totalPage: string | number;
  totalData: string | number;
}
export interface IProductState {
  list: {
    data: IProduct[];
    pagination: IProductPagination | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  };
}
