import { configureStore } from "@reduxjs/toolkit";
import { cartSlicer } from "./reducers/cartSlicer";
import {
  productCartSlicer,
  productSearchSlicer,
} from "./reducers/productSlicer";
import { authenticationSlice } from "./reducers/authenticationSlicer";
import { basketSlice } from "./reducers/basketSlice";
import { wishlistSlicer } from "./reducers/wishlistSlicer";

export const store = configureStore({
  reducer: {
    cart: cartSlicer.reducer,
    wishlist: wishlistSlicer.reducer,
    cartProduct: productCartSlicer.reducer,
    searchResult: productSearchSlicer.reducer,
    authentication: authenticationSlice.reducer,
    basket: basketSlice.reducer,
  },
});
