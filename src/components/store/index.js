import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./ui-slice";
import cartSliceReducer from "./cart-slice";
import productSliceReducer from "./product-slice";

const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    cart: cartSliceReducer,
    product: productSliceReducer,
  },
});

export default store;
