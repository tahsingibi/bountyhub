import { configureStore } from "@reduxjs/toolkit";
import { reducer as verifyReducer } from "./verifyStore/verifyStore";
import { reducer as membershipReducer } from "./membershipStore/membershipStore";
import { reducer as userReducer } from "./userStore/userStore";
import { reducer as appReducer } from "./appStore/appStore";
import { reducer as modalReducer } from "./modalStore/modalStore";
import { reducer as communityReducer } from "./communityStore/communityStore";
import reduxFormStore from "./reduxFormStore/reduxFormStore";

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      app: appReducer,
      reduxForm: reduxFormStore,
      modal: modalReducer,

      verification: verifyReducer,
      membership: membershipReducer,

      user: userReducer,

      community: communityReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });

  return store;
}

export const store = createStore();
