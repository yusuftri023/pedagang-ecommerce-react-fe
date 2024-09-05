import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";

import { logout } from "./reducers/authenticationSlicer";

export const listenerMiddleware = createListenerMiddleware();
export const startAppListening = listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (action, listenerApi) => {
    console.log(listenerApi.getOriginalState());
    console.log(action);
    await listenerApi.delay(5000);
    console.log(listenerApi.getState());
  },
});
export const addAppListener = addListener();
