import { createSlice } from "@reduxjs/toolkit";

const webContentSlice = createSlice({
  name: "webContent",
  initialState: {
    showModal: false,
    typeModal: null,
    contentModal: null,
    showPopUp: false,
    typePopUp: null,
  },
  reducers: {
    modalToggle: (state, action) => {
      state.showModal =
        typeof action.payload === "boolean" ? action.payload : !state.showModal;
    },
    popUpToggle: (state, action) => {
      state.showPopUp = action.payload;
    },
    modalChange: (state, action) => {
      state.typeModal = action.payload.type;
      state.contentModal = action.payload.content || null;
    },
    popUpChange: (state, action) => {
      state.typePopUp = action.payload.type;
    },
  },
});
export const { modalToggle, modalChange, popUpToggle, popUpChange } =
  webContentSlice.actions;
export default webContentSlice.reducer;
