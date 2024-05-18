import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    loggedInUserData: null,
    error: null,
  },
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      const database = JSON.parse(localStorage.getItem("userData"));
      const loggedInUserData = database.find(
        ({ email }) => email === action.payload.email
      );

      localStorage.setItem(
        "loggedInUserData",
        JSON.stringify(loggedInUserData)
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      const userData = JSON.parse(localStorage.getItem("userData")) || [];
      state.registerSuccess = true;
      const updatedDB = userData.map((val) => {
        if (
          val.email ===
          JSON.parse(localStorage.getItem("loggedInUserData")).email
        ) {
          return {
            ...JSON.parse(localStorage.getItem("loggedInUserData")),
            cart: [
              sessionStorage.getItem("cart")
                ? sessionStorage.getItem("cart")
                : undefined,
            ],
          };
        }
        return val;
      });
      localStorage.setItem("userData", JSON.stringify([...updatedDB]));
      localStorage.removeItem("loggedInUserData");
      sessionStorage.removeItem("cart");
      location.reload();
    },
  },
});
export const { register, authenticate, setError, clearError, logout } =
  authenticationSlice.actions;
