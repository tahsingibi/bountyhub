import { createSlice } from "@reduxjs/toolkit";

const OTP_LENGTH = 4;
const clear = (char) => new Array(char).fill("");

const initialState = {
  verification: {
    isResendable: true,
    isSended: false,
    verifyCode: "",
    isLoading: false,
    message: null,
    reload: 0,
  },
  counter: {
    isShow: false,
    isCount: true,
  },
  otp: {
    values: clear(OTP_LENGTH),
    length: OTP_LENGTH,
  },
};

export const { reducer, actions } = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setIsResendable: (state, action) => {
      state.verification.isResendable = action.payload;
    },
    setIsSended: (state, action) => {
      state.verification.isSended = action.payload;
    },
    setVerifyCode: (state, action) => {
      state.verification.verifyCode = action.payload;
    },
    setIsLoading: (state, action) => {
      state.verification.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.verification.message = action.payload;
    },
    setReload: (state, action) => {
      state.verification.reload = action.payload;
    },
    setIsShowCount: (state, action) => {
      state.counter.isShow = action.payload;
    },
    setIsCount: (state, action) => {
      state.counter.isCount = action.payload;
    },
    setOTP: (state, action) => {
      state.otp.values = action.payload;
    },
    clearOTP: (state, action) => {
      state.otp.length = action.payload;
      state.otp.values = clear(action.payload);
    },
  },
});
