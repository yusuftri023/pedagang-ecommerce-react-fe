import { createSlice } from "@reduxjs/toolkit";
import { getSearchProduct } from "../actions/productAction";

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
export default productSearchSlicer.reducer;
