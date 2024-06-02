import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../actions/cartAction";

export const cartSlicer = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    totalPrice: 0,
    error: null,
    isLoading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
    decreaseCart: (state, action) => {},
    setCartError: (state, action) => {
      state.error = action.payload;
    },
    clearCartError: (state) => {
      state.error = null;
    },
    getTotals: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        console.log("fetching cart success");
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(getCart.pending, (state) => {
        console.log("fetching cart pending");
        state.isLoading = true;
      })
      .addCase(getCart.rejected, (state) => {
        console.log("fetching cart failed");
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
} = cartSlicer.actions;
