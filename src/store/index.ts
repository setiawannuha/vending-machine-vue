import { createStore } from "vuex";
import product from "./product/index";
import transaction from "./transaction/index";

const store = createStore({
  modules: {
    product,
    transaction,
  },
});

export default store;
