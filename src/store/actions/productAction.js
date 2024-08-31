import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchProduct } from "../../services/product.service";

export const getSearchProduct = createAsyncThunk(
  "searchProduct/getSearchProduct",
  async ({ searchString, category = "All" }) => {
    const data = await searchProduct(searchString, category);

    return data;
  }
);
