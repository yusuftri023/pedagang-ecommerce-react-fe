import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAuth } from "../../services/auth.service";

export const getUserData = createAsyncThunk(
  "userData/getUserData",
  async () => {
    const data = await getAuth();
    return data;
  }
);
