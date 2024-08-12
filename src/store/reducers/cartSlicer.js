import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../actions/cartAction";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    totalPrice: 0,
    error: null,
    isLoading: false,
  },
  reducers: {
    addToCart: () => {},
    clearCart: (state) => {
      state.cart = null;
    },
    decreaseCart: () => {},
    setCartError: (state, action) => {
      state.error = action.payload;
    },
    clearCartError: (state) => {
      state.error = null;
    },
    getTotals: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
        state.cart = null;
      });
  },
});
export const {
  addToCart,
  decreaseCart,
  clearCart,
  getTotals,
  setCartError,
  clearCartError,
} = cartSlice.actions;
export default cartSlice.reducer;
