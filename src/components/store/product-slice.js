import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      title: "Test item",
      price: 60,
      description: "This is a first product - amazing!",
    },
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add(state, action) {
      state.products = [...state.products, action.payload];
    },
  },
});

export const productSliceActions = productSlice.actions;
export default productSlice.reducer;
