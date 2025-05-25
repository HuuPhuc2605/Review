import { configureStore } from "@reduxjs/toolkit";

import reducerP from "./features/products/productSlice";

const store = configureStore({
  reducer: {
    productL: reducerP,
  },
});
export default store;
