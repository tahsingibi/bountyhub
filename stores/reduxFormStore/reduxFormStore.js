import { createSlice } from "@reduxjs/toolkit";

export const reduxFormSlice = createSlice({
  name: "reduxForm",
  initialState: {},
  reducers: {
    UPDATE_FORM_STATE: (state, action) => {
      state[action.payload.form] = action.payload.state;
    },
  },
});

export const { UPDATE_FORM_STATE } = reduxFormSlice.actions;

export default reduxFormSlice.reducer;
