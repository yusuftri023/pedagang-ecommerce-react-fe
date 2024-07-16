import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserCart } from "../../services/cart.service";

export const getUserCart = createAsyncThunk(
  "userCart/getUserCart",
  async (id) => {
    const { data } = await fetchUserCart(id);

    return data;
  }
);
