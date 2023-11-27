const whitelist = {
  gmail: {
    name: "Gmail",
    url: "https://mail.google.com",
  },
  outlook: {
    name: "Outlook",
    url: "https://outlook.live.com",
  },
};

export default function whitelistEmail(email) {
  if (email?.length) {
    const splitted = email?.split("@")[1]?.split(".")[0];

    return whitelist[splitted] || null;
  }
}
