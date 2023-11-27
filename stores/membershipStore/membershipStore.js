import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  membership: {
    username: null,
    email: null,
    google: null,
    discord: null,
    twitter: null,
    apple: null,
    key: null,
    type: null,
    redirect: null,
    additional: null,
    additionalData: [],
    captcha: null,
    registerToken: null,
    verifyToken: null,
    verifyTokenType: null,
    connectMessage: null,
    loginType: null,
  },
};

export const { reducer, actions } = createSlice({
  name: "membership",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.membership.username = action.payload;
    },
    setEmail: (state, action) => {
      state.membership.email = action.payload;
    },
    setGoogle: (state, action) => {
      state.membership.google = action.payload;
    },
    setDiscord: (state, action) => {
      state.membership.discord = action.payload;
    },
    setTwitter: (state, action) => {
      state.membership.twitter = action.payload;
    },
    setApple: (state, action) => {
      state.membership.apple = action.payload;
    },
    setKey: (state, action) => {
      state.membership.key = action.payload;
    },
    setType: (state, action) => {
      state.membership.type = action.payload;
    },
    setRedirect: (state, action) => {
      state.membership.redirect = action.payload;
    },
    setAdditional: (state, action) => {
      state.membership.additional = action.payload;
    },
    setAdditionalData: (state, action) => {
      state.membership.additionalData = action.payload;
    },
    setCaptcha: (state, action) => {
      state.membership.captcha = action.payload;
    },
    setRegisterToken: (state, action) => {
      state.membership.registerToken = action.payload;
    },
    setVerifyToken: (state, action) => {
      state.membership.verifyToken = action.payload;
    },
    setVerifyTokenType: (state, action) => {
      state.membership.verifyTokenType = action.payload;
    },
    setConnectMessage: (state, action) => {
      state.membership.connectMessage = action.payload;
    },
    setLoginType: (state, action) => {
      state.membership.loginType = action.payload;
    },
  },
});
