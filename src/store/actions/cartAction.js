import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserCart, getCustomerCart } from "../../services/cart.service";

export const getUserCart = createAsyncThunk(
  "userCart/getUserCart",
  async (id) => {
    const { data } = await fetchUserCart(id);

    return data;
  }
);
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const data = await getCustomerCart();
  return data;
});
