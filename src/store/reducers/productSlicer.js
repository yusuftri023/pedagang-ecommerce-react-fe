import { createSlice } from "@reduxjs/toolkit";
import { getProductCart, getSearchProduct } from "../actions/productAction";

export const productCartSlicer = createSlice({
  name: "cartProduct",
  initialState: {
    data: [],
    isLoading: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCart.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getProductCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
export const productSearchSlicer = createSlice({
  name: "searchResult",
  initialState: {
    data: [],
    isLoading: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProduct.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getSearchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
