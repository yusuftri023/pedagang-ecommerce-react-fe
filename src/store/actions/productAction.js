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
    let res;

    if (category === "all") res = await fetchAllProduct();
    else res = await fetchProductInCategory(category);

    const data = res.filter(({ title }) =>
      title.toLowerCase().includes(searchString.toLowerCase())
    );

    return data;
  }
);
