import { configureStore } from "@reduxjs/toolkit";
import { cartSlicer } from "./reducers/cartSlicer";
import {
  productCartSlicer,
  productSearchSlicer,
} from "./reducers/productSlicer";
import { authenticationSlice } from "./reducers/authenticationSlicer";

export const store = configureStore({
  reducer: {
    cart: cartSlicer.reducer,
    cartProduct: productCartSlicer.reducer,
    searchResult: productSearchSlicer.reducer,
    authentication: authenticationSlice.reducer,
  },
});
