import axios from "axios";
import { ITransactionBody } from "./interface";

export default {
  async insertTransaction(_context: any, body: ITransactionBody) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/transaction`,
        body,
        {
          headers: {
            token: import.meta.env.VITE_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
