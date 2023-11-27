import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  app: {
    ready: false,
  },
};

export const { reducer, actions } = createSlice({
  name: "app",
  initialState,
  reducers: {
    setReady: (state, action) => {
      state.app.ready = action.payload;
    },
  },
});
