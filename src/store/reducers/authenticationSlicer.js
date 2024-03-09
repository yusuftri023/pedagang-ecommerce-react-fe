import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "loginState",
  initialState: {
    isLogin: false,
    token: null,
    isLoading: null,
    error: null,
  },
  reducers: {
    authenticate: (state, action) => {},
  },
});
