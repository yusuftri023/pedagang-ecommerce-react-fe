import { createSlice } from "@reduxjs/toolkit";
import { getUserCart } from "../actions/cartAction";

export const cartSlicer = createSlice({
  name: "cart",
  initialState: {
    data: [],
    isLoading: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
