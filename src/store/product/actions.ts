import axios from "axios";
export default {
  async getAllProduct(
    context: any,
    { search, page, limit }: { search: string; page: number; limit: number }
  ) {
    context.commit("GET_ALL_PRODUCT_PENDING");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/product?search=${search}&page=${page}&limit=${limit}`,
        {
          headers: {
            token: import.meta.env.VITE_API_KEY,
          },
        }
      );
      const data = response.data;
      context.commit("GET_ALL_PRODUCT_FULFILLED", data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        context.commit("GET_ALL_PRODUCT_REJECTED", error.message);
        return error;
      }
      context.commit("GET_ALL_PRODUCT_REJECTED", "Something wrong");
      return error;
    }
  },
};
