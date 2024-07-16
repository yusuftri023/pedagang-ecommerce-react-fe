import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlist } from "../../services/wishlist.service";

export const getUserWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    const data = await getWishlist();
    return data;
  }
);
