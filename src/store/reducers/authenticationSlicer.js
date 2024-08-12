import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../actions/customerAction";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    loggedInUserData: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.loggedInUserData = action.payload;
    },
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.loggedInUserData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loggedInUserData = action.payload.data;
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.loggedInUserData = null;
      });
  },
});
export const { setLogin, setAuth, setError, clearError, logout } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
