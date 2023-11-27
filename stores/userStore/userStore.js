import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: null,
    email: null,
    provider: null,
    key: null,
    avatar: null,
    additionalInformations: null,
    discordUsername: null,
    twitterUsername: null,
    telegramUsername: null,
    web3Wallet: null,
    connectState: null,
  },
};

export const { reducer, actions } = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.user.username = action.payload;
    },
    setEmail: (state, action) => {
      state.user.email = action.payload;
    },
    setProvider: (state, action) => {
      state.user.provider = action.payload;
    },
    setKey: (state, action) => {
      state.user.key = action.payload;
    },
    setAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
    setAdditional: (state, action) => {
      state.user.additionalInformations = action.payload;
    },
    setDiscordUsername: (state, action) => {
      state.user.discordUsername = action.payload;
    },
    setTwitterUsername: (state, action) => {
      state.user.twitterUsername = action.payload;
    },
    setTelegramUsername: (state, action) => {
      state.user.telegramUsername = action.payload;
    },
    setWeb3Wallet: (state, action) => {
      state.user.web3Wallet = action.payload;
    },
    setConnectState: (state, action) => {
      state.user.connectState = action.payload;
    },
  },
});
