import { configureStore } from "@reduxjs/toolkit";
import productSearchSlicer from "./reducers/productSlicer";
import authenticationSlicer from "./reducers/authenticationSlicer";
import wishlistSlicer from "./reducers/wishlistSlicer";
import webContentSlicer from "./reducers/webContentSlicer";
import { apiSlice } from "./reducers/apiSlicer";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlicer,
    searchResult: productSearchSlicer,
    authentication: authenticationSlicer,
    webContent: webContentSlicer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware),
});
