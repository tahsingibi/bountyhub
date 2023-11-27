import { FE_API_URL } from "./fetchRequest";
export const redirectUri = FE_API_URL + "membership/callback";

export default function PageRedirect(val, type) {
  const pages = {
    login: "/",
    "verify-code": type == "LoginVerify" ? `/membership/connect/verify` : "",
    register: "/membership/connect/register",
    captcha: "/membership/connect/captcha",
    connect: "/membership/connect",
    disconnect: "/membership/disconnect",
    createCommunity: "/create-community",

    static: [
      { id: 1, name: "Home", route: "/" },
      { id: 2, name: "Explore", route: "/explore" },
      { id: 3, name: "Communities", route: "/communities" },
      { id: 4, name: "Docs", route: "/docs" },
    ],

    profile: [
      {
        id: 1,
        name: "Profile",
        icon: "user",
        path: "/membership/profile",
      },
      {
        id: 2,
        name: "Linked accounts",
        icon: "link",
        path: "/membership/linked-accounts",
      },
      {
        id: 3,
        name: "My communities",
        icon: "star",
        path: "/membership/my-communities",
      },
      {
        id: 4,
        name: "Privacy and security",
        icon: "sandwatch",
        path: "/membership/privacy-security",
      },
      {
        id: 5,
        name: "Explore",
        icon: "fire",
        path: "/membership/explore",
      },
      {
        id: 6,
        name: "Disconnect",
        icon: "disconnect",
        path: "/membership/disconnect",
      },
    ],

    connectRedirect: {
      google: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}/google&response_type=token&scope=openid%20profile%20email`,

      apple: `https://appleid.apple.com/auth/authorize?client_id=${process.env.APPLE_CLIENT_ID}&redirect_uri=${redirectUri}/apple&response_type=code id_token&scope=openid&response_mode=form_post`,

      discord: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}/discord&response_type=code&scope=identify%20email`,

      twitter: `https://api.twitter.com/oauth/authenticate?`,

      telegram: `https://oauth.telegram.org/auth/auth?bot_id=${process.env.TELEGRAM_BOT_ID}&origin=https%3A%2F%2Fcore.telegram.org&request_access=write&return_to=${process.env.APP_ADDRESS}`,
    },
  };

  return pages[val];
}
