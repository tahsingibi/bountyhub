import { useDispatch, useSelector } from "react-redux";
import { actions as MembershipStore } from "../../stores/membershipStore/membershipStore";
import { actions as VerifyStore } from "../../stores/verifyStore/verifyStore";
import FetchRequest from "../../utils/fetchRequest";
import redirectPage from "../../utils/redirect";
import { useRouter, usePathname } from "next/navigation";
import { isApple, isClient } from "@/utils/devices";
import hashEncrypt from "@/utils/hashEncrypt";

import useStorage, { storages } from "../../utils/useStorage";
import UserActions from "../userServices/userServices";
import { delay } from "@/utils/delay";
import getSearchParams from "@/utils/getSearchParams";

const APP_ADDRESS = process.env.APP_ADDRESS;

export function loginTypes(loginParams) {
  let twitterToken;
  let twitterVerifier;

  let appleToken;

  let isTwitterSigningIn;

  let loginType;
  let loginCode;

  if (isClient && loginParams?.type) {
    twitterToken = loginParams?.oauth_token || null;
    twitterVerifier = loginParams?.oauth_verifier || null;

    appleToken = loginParams?.id_token || null;

    isTwitterSigningIn = twitterToken && twitterVerifier;

    loginType = appleToken ? "apple" : loginParams?.type || null;
    loginCode = loginParams?.code || null;
  }

  return {
    twitterToken,
    twitterVerifier,
    appleToken,
    isTwitterSigningIn,
    loginType,
    loginCode,
  };
}

const loginRedirects = redirectPage("connectRedirect");

export default function MembershipActions() {
  const { beStorage, feStorage, userStorage } = storages;
  const dispatch = useDispatch();

  const pathname = usePathname();
  const loginParams = getSearchParams();

  const {
    twitterToken,
    twitterVerifier,
    appleToken,
    isTwitterSigningIn,
    loginType,
    loginCode,
  } = loginTypes(loginParams);

  const newParams = new URLSearchParams(hashEncrypt());
  const accessToken = newParams?.get("access_token") || null;

  const {
    email,
    username,
    key,
    additionalData,
    verifyToken,
    verifyTokenType,
    registerToken,
  } = useSelector((state) => state.membership.membership);

  const { push, replace } = useRouter();
  const { setItem, getItem } = useStorage();

  const { getUserInfo } = UserActions();

  const userLocalStorage = getItem(userStorage);
  const userIsLogin = !!userLocalStorage;

  const {
    setUsername,
    setEmail,
    setGoogle,
    setDiscord,
    setKey,
    setRedirect,
    setAdditional,
    setAdditionalData,
    setCaptcha,
    setRegisterToken,
    setVerifyToken,
    setVerifyTokenType,
    setLoginType,
    setConnectMessage,
  } = MembershipStore;

  const { setMessage, setVerifyCode, clearOTP } = VerifyStore;

  function clearMembership() {
    dispatch(setUsername(null));
    dispatch(setEmail(null));
    dispatch(setGoogle(null));
    dispatch(setDiscord(null));
    dispatch(setKey(null));
    dispatch(setRedirect(null));
    dispatch(setAdditional(null));
    dispatch(setAdditionalData(null));
    dispatch(setCaptcha(null));
    dispatch(setRegisterToken(null));
    dispatch(setVerifyToken(null));
    dispatch(setVerifyTokenType(null));
    dispatch(setLoginType(null));
    dispatch(setConnectMessage(null));
    dispatch(setVerifyCode(""));
    dispatch(clearOTP());
  }

  async function connectTwitter() {
    await FetchRequest("membership/twitter", {
      onSuccess: ({ success, data = null }) =>
        success && data && push(res?.data),

      onError: (message) => dispatch(setConnectMessage(message)),
    });

    dispatch(setLoginType(null));
  }

  async function connectApple() {
    const redirectUri = APP_ADDRESS + redirectPage("connect");

    AppleID?.auth?.init({
      clientId: process.env.APPLE_CLIENT_ID,
      scope: "openid",
      redirectURI: `${redirectUri}/apple`,
      usePopup: true,
    });

    AppleID?.auth?.signIn();

    document.addEventListener("AppleIDSignInOnSuccess", (event) => {
      const loginBody = new URLSearchParams();
      loginBody.append("connect_type", "apple");
      loginBody.append("apple", event.detail.authorization.id_token);

      loginRequest(loginBody);
    });

    document.addEventListener("AppleIDSignInOnFailure", (event) => {
      dispatch(setLoginType(null));
    });
  }

  async function connectEmail(config) {
    const { type, value } = config;

    const body = new URLSearchParams();
    body.append("connect_type", type);
    body.append("email", value.email);

    await loginRequest(body);
  }

  async function connectRegister(config) {
    const { email, username } = config;

    const additionalPrefix = "additionalData~";

    let additionalData = [];

    const additionalArray =
      Object.keys(config).filter((key) => key?.startsWith("additionalData~")) ||
      [];

    const additional = config[additionalArray] || [];
    dispatch(setAdditional(additional));

    if (config[additionalArray]) {
      additionalArray.forEach((item) => {
        let question = {
          key: item.replace(additionalPrefix, ""),
          value: config[item].value || "",
        };
        additionalData.push(question);
      });
    }

    dispatch(setAdditionalData(additionalData));
    dispatch(setUsername(username));
    dispatch(setEmail(email));

    replace(redirectPage("captcha"));
  }

  async function connectCaptcha(captchaKey) {
    dispatch(setCaptcha(captchaKey));

    const newAdditionalData = JSON.stringify(additionalData);
    if (captchaKey) {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("email", email);
      body.append("additionalData", newAdditionalData);
      body.append("key", key);
      body.append("recaptcha", captchaKey);

      await FetchRequest("membership/register", {
        method: "POST",
        body,
        onSuccess: ({ registerToken, verifyToken, verifyTokenType }) => {
          dispatch(setRegisterToken(registerToken));
          dispatch(setVerifyToken(verifyToken));
          dispatch(setVerifyTokenType(verifyTokenType));

          replace(redirectPage("verify-code", "LoginVerify"));
        },
        onError: async (message) => {
          if (message) {
            dispatch(setConnectMessage(message));
            await delay(200);
            replace(redirectPage("register"));
          }
        },
      });
    }
  }

  async function connectVerify(userVerify) {
    if (userVerify) {
      const body = new URLSearchParams();
      body.append("verifyToken", verifyToken);
      body.append("type", verifyTokenType);
      body.append("verifyCode", userVerify);
      body.append("registerToken", registerToken);

      await FetchRequest("membership/verify", {
        method: "POST",
        body,
        onSuccess: async (res) => {
          setItem(beStorage, res.token);
          setItem(feStorage, res.access);
          dispatch(setKey(res.key));
          if (res?.redirect == "login") return await getUserInfo(res);
        },
        onError: (res) => dispatch(setMessage(res)),
      });
    }
  }

  async function connectOAuth() {
    const authCode = accessToken || loginCode || appleToken;
    const isDisconnecting = redirectPage("disconnect") == pathname;
    const loggedIn = !isDisconnecting && userIsLogin;
    const signingIn =
      (loginType && authCode && !isDisconnecting) ||
      (isTwitterSigningIn && !isDisconnecting);

    if (loggedIn && loginType) {
      await getUserInfo();
      const link = APP_ADDRESS + redirectPage("profile")[1]?.path;
      let connectLink = new URL(link);
      if (authCode) {
        connectLink.searchParams.append("type", loginType);
        connectLink.searchParams.append("code", authCode);
      }

      return replace(connectLink?.toString());
    }

    if (loggedIn) return await getUserInfo();

    if (signingIn) {
      const loginBody = new URLSearchParams();

      if (isTwitterSigningIn) {
        loginBody.append("connect_type", "twitter");
        loginBody.append("oauth_token", twitterToken);
        loginBody.append("oauth_verifier", twitterVerifier);
      } else {
        loginBody.append("connect_type", loginType);
        loginBody.append(loginType, authCode);
      }

      await loginRequest(loginBody);
    }
  }

  async function loginRequest(loginBody) {
    const signType = loginBody?.get("connect_type");
    dispatch(setLoginType(signType));

    await FetchRequest("membership/login", {
      method: "POST",
      body: loginBody,
      onSuccess: async (result) => {
        let redirectAddress = redirectPage(result?.redirect, result?.type);

        dispatch(setEmail(result?.email));
        dispatch(setGoogle(result?.google));
        dispatch(setKey(result?.key));
        dispatch(setRedirect(result?.redirect));
        dispatch(setDiscord(result?.discord));
        if (result?.type == "LoginVerify")
          dispatch(setVerifyToken(result?.key));

        if (result?.redirect == "login") await getUserInfo(result);

        push(redirectAddress);
      },

      onError: (message) => {
        dispatch(setConnectMessage(message));
        !!message && dispatch(setLoginType(null));
      },
    });
  }

  async function connectSystem(type, value) {
    dispatch(setLoginType(type));

    const connect = {
      google: async () => push(loginRedirects[type]),

      discord: async () => push(loginRedirects[type]),

      twitter: async () => await connectTwitter(),

      apple: async () => {
        if (isApple()) return push(loginRedirects[type]);

        connectApple();
      },

      email: async () => await connectEmail({ type: type, value: value }),
    };

    return connect[type]();
  }

  return {
    clearMembership,

    userLocalStorage,

    connectSystem,
    connectOAuth,

    connectRegister,
    connectCaptcha,
    connectVerify,
  };
}
