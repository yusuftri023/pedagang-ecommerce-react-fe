import { configureStore } from "@reduxjs/toolkit";
import cartSlicer from "./reducers/cartSlicer";
import {
  productCartSlicer,
  productSearchSlicer,
} from "./reducers/productSlicer";
import authenticationSlicer from "./reducers/authenticationSlicer";
import wishlistSlicer from "./reducers/wishlistSlicer";
import webContentSlicer from "./reducers/webContentSlicer";

export const store = configureStore({
  reducer: {
    cart: cartSlicer,
    wishlist: wishlistSlicer,
    cartProduct: productCartSlicer.reducer,
    searchResult: productSearchSlicer.reducer,
    authentication: authenticationSlicer,
    webContent: webContentSlicer,
  },
});
