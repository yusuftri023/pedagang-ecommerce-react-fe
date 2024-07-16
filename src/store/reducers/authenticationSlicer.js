import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: localStorage.getItem("loggedInUserData") ? true : false,
    loggedInUserData: JSON.parse(localStorage.getItem("loggedInUserData")),
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
    register: (state, action) => {
      const userData = JSON.parse(localStorage.getItem("userData")) || [];
      state.registerSuccess = true;
      userData.push({
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        age: action.payload.age,
        phoneNumber: action.payload.phoneNumber,
        cart: [],
      });
      localStorage.setItem("userData", JSON.stringify(userData));
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
