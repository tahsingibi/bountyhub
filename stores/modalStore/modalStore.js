import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: [],
};

export const { reducer, actions } = createSlice({
  name: "modal",
  initialState,
  reducers: {
    append: (state, action) => {
      state.modals = [...state.modals, action.payload];
    },
    destroy: (state) => {},

    destroyAll: (state) => {
      state.modals = [];
    },
  },
});
