import { useDispatch, useSelector } from "react-redux";
import { actions as UserStore } from "../../stores/userStore/userStore";
import UseStorage, { storages } from "../../utils/useStorage";
import getToken from "../../utils/getToken";
import FetchRequest, {
  fetchApiRequest,
  FE_API_URL,
} from "../../utils/fetchRequest";
import { useRouter, usePathname } from "next/navigation";
import redirectPage from "../../utils/redirect";
import { isClient } from "../../utils/devices";
import encodeBase64 from "@/utils/encodeBase64";

export default function UserActions() {
  const { keyStorage, userStorage } = storages;
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.user.user);

  const redirectConnectSocial = redirectPage("connectRedirect");
  const redirectDisconnect = redirectPage("disconnect");

  const { setItem, getItem } = UseStorage();

  const { replace, push } = useRouter();
  const path = usePathname();

  const localUserInfo = JSON.parse(getItem(userStorage));

  const {
    setUsername: setStoreUsername,
    setEmail: setStoreEmail,
    setProvider: setStoreProvider,
    setKey: setStoreKey,
    setAvatar: setStoreAvatar,
    setAdditional: setStoreAdditional,
    setDiscordUsername: setStoreDiscord,
    setTwitterUsername: setStoreTwitter,
    setTelegramUsername: setStoreTelegram,
    setWeb3Wallet: setStoreWeb3Wallet,
    setConnectState: setStoreConnectState,
  } = UserStore;

  const setUsername = (username) => dispatch(setStoreUsername(username));

  const setEmail = (email) => dispatch(setStoreEmail(email));

  const setProvider = (provider) => dispatch(setStoreProvider(provider));

  const setKey = (key) => dispatch(setStoreKey(key));

  const setAvatar = (avatar) => dispatch(setStoreAvatar(avatar));

  const setAdditional = (add) => dispatch(setStoreAdditional(add));

  const setDiscord = (discord) => dispatch(setStoreDiscord(discord));

  const setTwitter = (twitter) => dispatch(setStoreTwitter(twitter));

  const setTelegramUsername = (name) => dispatch(setStoreTelegram(name));

  const setWeb3Wallet = (wallet) => dispatch(setStoreWeb3Wallet(wallet));

  const setConnectState = (connect) => dispatch(setStoreConnectState(connect));

  const getLoggedUser = () => userInfos || localUserInfo;

  function disconnectUser() {
    setUsername(null);
    setEmail(null);
    setProvider(null);
    setKey(null);
    setAvatar(null);
    setTwitter(null);
    setAdditional(null);
    setDiscord(null);
    setWeb3Wallet(null);
  }

  async function getUserInfo(res) {
    const _url = FE_API_URL + "user/me";

    const _tokens = await getToken();
    const authorization = _tokens?.token;
    const access = _tokens?.access;

    const userKey = getItem(keyStorage);

    let settings = {
      headers: {
        authorization: authorization,
        access: access,
        token: userKey,
      },
    };

    if (!localUserInfo) {
      const newToken = await getToken({
        force: true,
        key: res?.key,
      });
      settings.headers.authorization = newToken.token;
      settings.headers.access = newToken.access;
      settings.headers.token = res?.key;
    }

    const meRequest = await fetchApiRequest(_url, settings, null);

    if (meRequest?.success) {
      setItem(userStorage, JSON.stringify(meRequest?.data));
      setItem(keyStorage, meRequest?.data?.key);

      setUsername(meRequest?.data?.username);
      setEmail(meRequest?.data?.email);
      setProvider(meRequest?.data?.provider);
      setKey(meRequest?.data?.key);
      setAvatar(meRequest?.data?.avatar);
      setTwitter(meRequest?.data?.twitterUsername);
      setTelegramUsername(meRequest?.data?.telegramUsername);
      setAdditional(meRequest?.data?.additionalInformations);
      setDiscord(meRequest?.data?.discordUsername);
      setWeb3Wallet(meRequest?.data?.web3Wallet);

      let redirectAddress = redirectPage(res?.redirect || "login", res?.type);

      if (path?.startsWith(redirectPage("connect"))) {
        replace(redirectAddress);
      }
    } else {
      return replace(redirectDisconnect);
    }

    return meRequest;
  }

  async function userUpdate({
    avatar = null,
    username = null,
    setMessage = () => {},
  }) {
    setMessage(null);
    const formData = new FormData();
    if (avatar) {
      formData.append("Avatar", userInfos?.avatar);
      formData.append("AvatarFile", avatar);
    }
    if (username) {
      formData.append("Username", username);
    }

    const _url = FE_API_URL + "user/me";

    const _tokens = await getToken();
    const authorization = _tokens?.token;
    const access = _tokens?.access;

    const userKey = getItem(keyStorage);

    const config = {
      method: "PUT",
      body: formData,
      headers: {
        authorization: authorization,
        access: access,
        token: userKey,
      },
    };

    const request = await fetchApiRequest(_url, config, null);
    setMessage(request);
    if (username) setUsername(username);
    if (avatar) {
      const image = new Image();
      image.src = URL.createObjectURL(avatar);
      setAvatar(image.src);
    }

    return request;
  }

  async function connectDiscord({ username }) {
    if (!username) {
      return push(redirectConnectSocial.discord + "&state=connect");
    }
    await disconnectSocial("discord");
  }

  async function connectTwitter({ username }) {
    console.log(username);
  }

  async function connectWallet(sign, callback = () => {}) {
    const urlParams = {
      type: "web3-wallet",
      code: sign,
    };

    await connectSocial(urlParams, callback);
  }

  async function connectSocial(param, callback = () => {}) {
    const linkedAccountLink = redirectPage("profile")[1]?.path;
    const isTelegramHash = !!(isClient && param?.id && param?.hash);

    let social = {
      type: param?.type || null,
      code: param?.code || null,
    };
    if (isTelegramHash) {
      social.type = "telegram";
      social.code = encodeBase64(JSON.stringify(param));
    }

    const isConnecting =
      social.type && social.code && !path.startsWith(redirectPage("connect"));
    if (isConnecting) {
      setConnectState({ type: social.type });
      if (!path?.includes(linkedAccountLink)) replace(linkedAccountLink);
      let body = new FormData();
      body.append("type", social.type);
      body.append("code", social.code);
      await FetchRequest("user/connect", {
        method: "POST",
        body,
        onSuccess: async (res) => {
          if (res?.success) {
            await getUserInfo();
            setConnectState({ ...res, type: social.type });
            callback(res);
          }
        },
        onError: (error) => {
          setConnectState({
            success: false,
            message: error,
            type: social.type,
          });
          callback(error);
        },
        onFinally: () => {
          replace(linkedAccountLink);
        },
      });
    }
  }

  async function disconnectSocial(type, callback = () => {}) {
    setConnectState({ type });
    if (type) {
      let body = new FormData();
      body.append("type", type);

      await FetchRequest("user/disconnect", {
        method: "POST",
        body,
        onSuccess: async (res) => {
          if (res?.success) {
            await getUserInfo();
            setConnectState({ ...res, type });
            callback(res);
          }
        },
        onError: (error) => {
          if (error) {
            setConnectState({ success: false, type, message: error });
            callback(error);
          }
        },
      });
    }
  }

  return {
    setUsername,
    setEmail,
    setProvider,
    setKey,
    setAvatar,
    getUserInfo,
    getLoggedUser,
    setConnectState,

    userUpdate,
    connectSocial,
    disconnectSocial,

    connectDiscord,
    connectTwitter,
    connectWallet,

    disconnectUser,
  };
}
