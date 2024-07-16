import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../actions/cartAction";
import { getUserWishlist } from "../actions/wishlistAction";

export const wishlistSlicer = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: null,
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
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload.data;
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.rejected, (state) => {
        state.isLoading = false;
        state.wishlist = null;
      });
  },
});
