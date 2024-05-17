import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCost: 0,
};

const calculateTotalCost = (items) => {
  let temp = 0;
  for (let i = 0; i < items.length; i++) {
    temp = items[i].total + temp;
  }
  return temp;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.items = [...state.items, { ...action.payload }];
    },
    decreaseItem(state, action) {
      console.log("decreaseItem id =>", action.payload);
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload) {
          state.items[i].quantity--;
          state.items[i].total = state.items[i].quantity * state.items[i].price;
          if (state.items[i].quantity === 0) {
            const index = i;
            if (index > -1) {
              state.items.splice(index, 1);
            }
            console.log(state.items);
            state.items = state.items.splice(i, i + 1);
          }
        }
      }
      state.totalCost = calculateTotalCost(state.items);
    },
    increaseItem(state, action) {
      console.log("increaseItem id =>", action.payload);

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload) {
          state.items[i].quantity++;
          state.items[i].total = state.items[i].quantity * state.items[i].price;
          break;
        }
      }
      state.totalCost = calculateTotalCost(state.items);
    },

    updateItemFromServer(state, action) {
      state.items = action.payload;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice.reducer;
