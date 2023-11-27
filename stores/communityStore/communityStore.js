import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  community: {
    category: null,
    singleCommunity: null,
    settingResult: null,
  },
};

export const { reducer, actions } = createSlice({
  name: "community",
  initialState,
  reducers: {
    setCommunityCategory: (state, action) => {
      state.community.category = action.payload;
    },
    setSingleCommunity: (state, action) => {
      state.community.singleCommunity = action.payload;
    },
    setSettingResult: (state, action) => {
      state.community.settingResult = action.payload;
    },
  },
});
