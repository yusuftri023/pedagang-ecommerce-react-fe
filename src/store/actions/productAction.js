import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProduct,
  fetchMultipleProduct,
  fetchProductInCategory,
} from "../../services/product.service";

export const getProductCart = createAsyncThunk(
  "cartProduct/getCartProduct",
  async (cartList) => {
    const data = await fetchMultipleProduct(cartList);

    return data;
  }
);
export const getSearchProduct = createAsyncThunk(
  "searchProduct/getSearchProduct",
  async ({ searchString, category = "all" }) => {
    let data;

    if (category === "all") data = await fetchAllProduct(searchString);
    else data = await fetchProductInCategory(category);

    return data;
  }
);
